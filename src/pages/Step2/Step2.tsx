import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import PhoneInput from 'react-phone-input-2'
import { clearFields, updateFields } from 'src/store/userSlice'
import 'react-phone-input-2/lib/style.css'
import './Step2.css'

const Step2 = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userPhone: string = useSelector((state: any) => state.user.phone)
    const inputRef = useRef<HTMLDivElement>(null);

    const [phone, setPhone] = useState(userPhone);
    const [error, setError] = useState('');
    const [isDirty, setDirty] = useState(false);
    const [isBtnDisabled, setBtnDisabled] = useState(true);

    useEffect(() => {
        // обработка клика вне поля
        const handleClickOutside = (event: MouseEvent) => {
            // isDirty - был клик по полю
            if (isDirty && inputRef.current && !inputRef.current.contains(event.target as Node)) {
                if (phone.length < 10) {
                    setError('Enter a correct phone number');
                    setBtnDisabled(true);
                }
                else {
                    setError('');
                    setBtnDisabled(false);
                }
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, [isDirty, phone]);

    const onBack = () => {
        dispatch(updateFields({phone: phone}));
        navigate("/");
    }
    const onSubmit = () => {
        dispatch(updateFields({phone: phone}));
        alert('Success!')
        dispatch(clearFields());
        navigate("/");
    }
    
    const focusPhone = () => {
        if (!isDirty) setDirty(true);
    }
    const changePhone = (value: string) => {
        if (value.length >= 10) {
            setError('');
            setBtnDisabled(false);
        } else {
            setError('Enter a correct phone number');
            setBtnDisabled(true);
        }
        setPhone(value);
    }

    return (
    <>
        <h1>Form Validate</h1>
        <h3>Step 2/2</h3>
        <form>
            <div ref={inputRef}>
                <PhoneInput
                    country={'by'}
                    value={phone}
                    onFocus={focusPhone}
                    onChange={value => changePhone(value)}
                    containerClass='container_custom'
                    inputClass='input_custom'
                    buttonClass='button_custom'
                />
            </div>
            {error && <p className='error'>{error}</p>}
     
            <div className="flex__buttons">
                <button className='button__back' onClick={onBack}>Back</button>
                <button className='button__send' onClick={onSubmit} disabled={isBtnDisabled}>Send</button>
            </div>
        </form>
    </>
  )
}

export default Step2
