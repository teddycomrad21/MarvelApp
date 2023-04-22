export default () => ({
    randomChar: {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 50%)',
        alignItems: 'center',
        boxShadow: '5px 5px 20px rgba(0, 0, 0, 0.25)'
    },
    block: {
        padding: [40, 35],
        display: 'grid',
        gridTemplateColumns: '180px auto',
        columnGap: 30
    },
    img: {
        width: 180,
        height: 180,
        objectFit: 'cover'
    },
    info: {
        display: 'grid',
        gridTemplateRows: 'minmax(29px, auto) 90px 38px',
        rowGap: 10,
        paddingTop: 3
    },
    name: {
        fontWeight: 'bold',
        fontSize: 22,
        lineHeight: '29px',
        textTransform: 'uppercase'
    },
    descr: {
        fontSize: 14,
        lineHeight: '18px'
    },
    btns: {
        '& a:nth-child(1)': {
            marginRight: 30
        }
    },
    static: {
        padding: [40, 35],
        backgroundColor: '#232222',
        position: 'relative',
        '& button': {
            marginTop: 13
        }
    },
    title: {
        fontWeight: 'bold',
        fontSize: 24,
        lineHeight: '32px',
        letterSpacing: '-0.045em',
        color: '#FFFFFF',

        '&:nth-child(2)': {
            marginTop: 33
        }
    },
    decoration: {
        position: 'absolute',
        bottom: 14,
        right: -37
    }
});