import { Directive, Input, TemplateRef, ViewContainerRef } from "@angular/core";

interface NgLetContext<T> {
  ngLet: T | null;
  $implicit: T | null;
}

@Directive({ selector: "[ngLet]" })
export class NgLetDirective<T> {
  private context: NgLetContext<T | null> = { ngLet: null, $implicit: null };
  private hasView: boolean = false;

  constructor(
    private viewContainer: ViewContainerRef,
    private templateRef: TemplateRef<NgLetContext<T>>
  ) {}

  @Input()
  set ngLet(value: T) {
    this.context.$implicit = this.context.ngLet = value;

    if (!this.hasView) {
      this.viewContainer.createEmbeddedView(this.templateRef, this.context);
      this.hasView = true;
    }
  }

  /** @internal */
  public static ngLetUseIfTypeGuard: void;

  static ngTemplateGuard_ngLet: "binding";

  public static ngTemplateContextGuard<T>(
    dir: NgLetDirective<T>,
    ctx: any
  ): ctx is NgLetContext<T> {
    return true;
  }
}
