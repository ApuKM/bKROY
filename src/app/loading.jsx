import { Spinner } from "@heroui/react";


const loading = () => {
    return (
        <div className='flex justify-center items-center bg-black h-[60vh]'>
            <Spinner size="xl"/>
        </div>
    );
};

export default loading;