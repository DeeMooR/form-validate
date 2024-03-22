import React, { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateFields } from 'src/store/userSlice'
import { IForm } from 'src/interfaces';
import CustomInput from 'src/components/CustomInput';

const Step1 = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userObj: IForm = useSelector((state: any) => state.user);

    const {
        register, 
        handleSubmit,
        setValue,
        formState: { errors, isValid }
    } = useForm<IForm>({ 
        mode: 'onBlur',
    });

    useEffect(() => {
        if(userObj) {
            setValue('name', userObj.name);
            setValue('age', userObj.age);
            setValue('email', userObj.email);
            setValue('password', userObj.password);
        }
    }, [userObj])

    const onSubmit: SubmitHandler<IForm> = (data) => {
        console.log(data)
        dispatch(updateFields(data));
        navigate("/step2");
    }

    return (
    <>
        <h1>Form Validate</h1>
        <h3>Step 1/2</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
            <CustomInput 
                fieldName="name" 
                type='text' 
                register={register} 
                error={errors.name} 
            />
            <CustomInput 
                fieldName="age" 
                type='text' 
                register={register} 
                error={errors.age}
                pattern={{
                    value: /^[0-9]+$/,
                    message: 'Enter the number',
                }} 
            />
            <CustomInput 
                fieldName="email" 
                type='email' 
                register={register} 
                error={errors.email}
                pattern={{
                    value: /\S+@\S+\.\S+/,
                    message: 'Enter a correct email',
                }} 
            />
            <CustomInput 
                fieldName="password" 
                type='password' 
                register={register} 
                error={errors.password}
                minLength={8}
                pattern={{
                    value: /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[!#$%&?]).*$/,
                    message: 'The password must contain numbers, letters and special characters',
                }} 
            />
            <button disabled={!isValid}>Next</button>
        </form>
    </>
  )
}

export default Step1
