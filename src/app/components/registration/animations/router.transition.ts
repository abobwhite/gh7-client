import { trigger, animate, style, group, query, transition, stagger } from '@angular/animations';

export const routerTransition = trigger('routerTransition', [
  transition('* <=> *', [
    group([
      query(':enter .animated-page', style({ opacity: 0, /* height: 0, */ width: 0 })
        , { optional: true }),
      // query(':leave .animated-page', [
      //   stagger(100, [
      //     style({ transform: 'translateX(0%)', opacity: 1, height: '!' }),
      //     animate('.25s 1s linear',
      //       style({ transform: 'translateX(100%)', opacity: 0, /*height: 0,*/ width: 0 }))]),
      // ], { optional: true }),
    ]),
    query(':enter .animated-page', [
      stagger(100, [
        style({ transform: 'translateX(100%)', opacity: 0}),
        animate('.25s 1s linear',
          style({ transform: 'translateX(0%)', opacity: 1, width: '*' })),
      ])], { optional: true }),
  ])
]);
