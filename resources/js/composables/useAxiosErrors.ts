import { ref } from 'vue';
import { AxiosError } from 'axios';
import { toast } from 'vue-sonner';

type LaravelError = {string : string};

export const useAxiosErrors = () => {

    const errors = ref<LaravelError | object>({});

    const handleAxiosError = (error : AxiosError) => {
        console.log("New Axios error : ", error);
        const status = error.status ?? 'desconocido';
        const data = error?.response?.data;
        const title = `Error (${status})`;
        const message = data?.message ?? "Error desconocido";
        if(data?.errors){
            errors.value = formatLaravelErrors(data?.errors)
        }
        toast.error(title, {description : message});
    }

    const formatLaravelErrors = ( errors : {string : array}) => {
        const keys = Object.keys(errors);
        const errorsFormatted = {};
        keys.forEach(k => {
             errorsFormatted[k] = errors[k][0]
        });

        return errorsFormatted;

    }

    return {
        errors,
        handleAxiosError
    }
}
