import { Component, OnInit, Input, ViewChild, ElementRef } from "@angular/core";
import { Observable, Subscription, fromEvent, of } from "rxjs";
import { flatMap, delay, takeUntil } from "rxjs/operators";

@Component({
  selector: "app-img-viewer",
  templateUrl: "./img-viewer.component.html",
  styleUrls: ["./img-viewer.component.scss"]
})
export class ImgViewerComponent implements OnInit {
  images: any = [];
  @Input("imageProp") imageProp: string[];
  @ViewChild("imgContainer", { static: true })
  imgContainer: ElementRef;

  enterEvt: Observable<any>;
  enterSub: Subscription;
  leaveEvt: Observable<any>;
  leaveSub: Subscription;

  constructor() {}

  ngOnInit() {
    this.images = ([...this.imageProp] as any).map(image => {
      return {
        uri: image,
        isActive: false
      };
    });
    this.images[0].isActive = true;

    this.enterEvt = fromEvent(this.imgContainer.nativeElement, "mouseenter");
    this.leaveEvt = fromEvent(this.imgContainer.nativeElement, "mouseleave");

    this.enterSub = this.enterEvt
      .pipe(
        flatMap((e, index) => of(e).pipe(delay(1000), takeUntil(this.leaveEvt)))
      )
      .subscribe(event => {
        const activeIndex = this.images.findIndex(image => image.isActive) + 1;
        if (activeIndex !== -1) {
          this.changeImage(activeIndex);
        }
      });

    this.leaveSub = this.leaveEvt.subscribe(evt => {
      this.changeImage(0);
    });
  }

  changeImage(index: number) {
    this.images.forEach(image => {
      image.isActive = false;
    });
    if (index !== this.images.length) {
      this.images[index].isActive = true;
    } else {
      this.images[0].isActive = true;
    }
  }

  ngOnDestroy() {
    this.enterSub.unsubscribe();
    this.leaveSub.unsubscribe();
  }
}
