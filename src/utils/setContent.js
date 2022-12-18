import Spinner from '../resources/spinner/Spinner';
import ErrorMesage from '../resources/errorMessage/ErrorMessage';
import Skeleton from '../components/skeleton/Skeleton';

export const setContent = (process, Component, data) => {
    switch (process) {
        case 'waiting':
            return <Skeleton />;
        case 'loading':
            return <Spinner />;
        case 'confirmed':
            return <Component data={data} />;
        case 'error':
            return <ErrorMesage />;
        default:
            throw new Error('Unexpected process state');
    };
};

export const setSpinnerAndError = (process) => {
    switch (process) {
        case 'waiting':
            return <Spinner />;
        case 'loading':
            return <Spinner />;
        case 'confirmed':
            break;
        case 'error':
            return <ErrorMesage />;
        default:
            throw new Error('Unexpected process state');
    };
};