import React, { FC } from 'react'
import { FieldError, UseFormRegister } from 'react-hook-form'
import { IForm } from '../../interfaces';
import './CustomInput.css'

interface ICustomInput {
    fieldName: keyof IForm,
    type: string,
    error: FieldError | undefined
    register: UseFormRegister<IForm>,
    minLength?: number,
    pattern?: {
        value: RegExp,
        message: string
    }
}

const CustomInput:FC<ICustomInput> = ({fieldName, type, error, register, minLength, pattern}) => {
    const getErrorMessage = (error: FieldError | undefined) => {
        if (error) return error.message || 'Error!';
        return '';
    }

    return (
        <div>
            <input type={type} placeholder={fieldName}
                className={`${error ? 'input__error' : ''}`}
                autoComplete={`new-${fieldName}`}
                {...register(fieldName, {
                    required: 'This field is required',
                    minLength: {
                        value: minLength || 0,
                        message: `Minimum ${minLength || 0} characters`
                    },
                    pattern: pattern
                })
            } />
            <p className='error'>{getErrorMessage(error)}</p>
        </div>
    )
}

export default CustomInput
