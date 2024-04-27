import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useTranslation } from 'react-i18next'

function Register() {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: ''
    })

    const navigate = useNavigate()
    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:8081/register', values)
        .then(res => {
            if(res.data.Status === "Success") {
                navigate('/')
            } else {
                alert("Error");
            }
        })
        .then(err => console.log(err));
    }

    const { t, i18n } = useTranslation();
    const changeLanguage = (language) => {
        i18n.changeLanguage(language);
        localStorage.setItem('i18nextLng', language);
    };

  return (
    <div className='d-flex justify-content-center align-items-center bg-dark vh-100'>
        <div className='bg-white p-3 rounded w-25'>
            <div className='text-center'>
                <h2>{t('signup')}</h2>
            </div>
            <form onSubmit={handleSubmit}>
                <div className='mb-3'>
                    <label htmlFor="name"><strong>{t('name')}</strong></label>
                    <input type="text" placeholder={t('enterName')} name='name' onChange={e => setValues({...values, name: e.target.value})} className='form-control rounded-0' />
                </div>
                <div className='mb-3'>
                    <label htmlFor="email"><strong>{t('email')}</strong></label>
                    <input type="email" placeholder={t('enterEmail')} name='email' onChange={e => setValues({...values, email: e.target.value})} 
                    className='form-control rounded-0' />
                </div>
                <div className='mb-3'>
                    <label htmlFor="password"><strong>{t('password')}</strong></label>
                    <input type="password" placeholder={t('enterPassword')} name='password' onChange={e => setValues({...values, password: e.target.value})} className='form-control rounded-0' />
                </div>
                <div className='d-grid gap-1 col-10 mx-auto'>
                    <button type='submit' className='btn btn-success w-100 rounded-5'>{t('signup')}</button>
                    <p className='text-center'>{t('terms')}</p>
                    <Link to='/login' className='btn btn-outline-success border-2 w-100 rounded-5 text-decoration-none'>{t('login')}</Link>
                </div>
            </form>
            <div className='mt-3 btn-group'>
                <button onClick={() => changeLanguage('en')} className='btn btn-outline-secondary btn-sm' style={{ '--bs-btn-padding-y': '.15rem', '--bs-btn-padding-x': '.25rem', '--bs-btn-font-size': '.75rem' }}>{t('english')}</button>
                <button onClick={() => changeLanguage('es')} className='btn btn-outline-secondary btn-sm' style={{ '--bs-btn-padding-y': '.15rem', '--bs-btn-padding-x': '.25rem', '--bs-btn-font-size': '.75rem' }}>{t('spanish')}</button>
            </div>
        </div>
    </div>
  )
}

export default Register