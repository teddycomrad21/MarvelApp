export default () => ({
    header: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    title: {
        fontWeight: 'bold',
        fontSize: 28,

        '& span': {
            color: '#9F0013'
        }
    },
    menu: {
        '& ul': {
            display: 'flex',
            justifyContent: 'space-between',
            fontWeight: 'bold',
            fintSize: 24,

            '& li': {
                margin: [0, 8],

                '&:hover': {
                    color: '#9F0013'
                }
            }
        }
    }
});