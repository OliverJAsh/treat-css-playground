import { style } from 'treat';

export const button = style({
    width: 200,
    height: 200,

    backgroundColor: 'blue',

    '@media': {
        '(min-width: 300px)': {
            backgroundColor: 'green',
        },
    },
});
