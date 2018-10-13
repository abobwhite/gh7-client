import { trigger, animate, style, group, query, transition, stagger } from '@angular/animations';

export const routerTransition = trigger('routerTransition', [
  transition('* <=> *', [
    group([
      query(':enter .form-field', style({ opacity: 0, height: 0 })
        , { optional: true }),
      query(':leave .form-field', [
        stagger(100, [
          style({ transform: 'translateX(0%)', opacity: 1, height: '!' }),
          animate('1s 1s cubic-bezier(.75,-0.48,.26,1.52)',
            style({ transform: 'translateX(100%)', opacity: 0, height: 0 }))]),
      ], { optional: true }),
    ]),
    query(':enter .form-field', [
      // style({ opacity: 0, height: 0 }),
      stagger(100, [
        style({ transform: 'translateX(100%)', opacity: 0, height: 0 }),
        animate('1s 1s cubic-bezier(.75,-0.48,.26,1.52)',
          style({ transform: 'translateX(0%)', opacity: 1, height: '*' })),
      ])], { optional: true }),
  ])
]);
