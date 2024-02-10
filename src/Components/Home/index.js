import React, { Fragment, useEffect, useState } from 'react';
import { Button, Input, Modal, notification } from 'antd';
import axios from 'axios'; // Import axios
import './Home.scss';
import imgBg from '../../asset/imgs/background.jpg';
import imgBotLeft from '../../asset/imgs/bot2.png';
import imgBotRight from '../../asset/imgs/bot3.png';
import logo from '../../asset/imgs/logo.png';
import header from '../../asset/imgs/hea1.png';
import baolixi from '../../asset/imgs/baolixi.jpg'

const Home = () => {
    const [name, setName] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [result, setResult] = useState({});
    const [totalUsers, setTotalUsers] = useState();

    const handleClick = async () => {
        if (name.trim() === '') {
            notification.warning({
                message: 'Warning',
                description: 'Please enter your name before clicking "Click Me!"'
            });
            return;
        }
    
        try {
            const response = await axios.post('https://be-lucky-money.vercel.app/random-update');
            setResult(response.data);
            setModalVisible(true);
    
            const saveResponse = await axios.post('https://be-lucky-money.vercel.app/save-user-result', {
                name: name,
                randomAmount: response.data.newRandomAmount
            });
    
            if (saveResponse.data.message === "You have already clicked before.") {
              notification.warning({
                  message: 'Warning',
                  description: 'You have already clicked before.'
              });
              return;
            }
    
            const res = await axios.get('https://be-lucky-money.vercel.app/total-users');
            setTotalUsers(res.data.totalUsers);
        } catch (error) {
            console.error('Error calling /random-update:', error);
        }
    };
    
    

    const handleModalOk = () => {
        setModalVisible(false);
    };

    return (
        <Fragment>
            <div className='container'>
                <div className='header'>
                    <div></div>
                    <div className='logo'>
                        <img src={logo} alt='logo 2024' />
                    </div>
                    <div className='header-left'>
                        <img src={header} alt='header' />
                    </div>
                </div>
                <div className='bg-content'>
                    <div className='img'>
                        <img src={imgBg} className='img-bg' />
                    </div>
                </div>
                <div className='content'>
                    <Input placeholder='Nhập tên của bạn' value={name} onChange={(e) => setName(e.target.value)} />
                    <Button onClick={handleClick}>
                        <img src={baolixi} />
                    </Button>
                </div>
                <div className='bottom'>
                    <div className='bot-left'>
                        <img src={imgBotLeft} />
                    </div>
                    <div className='bot-center'></div>
                    <div className='bot-right'>
                        <img src={imgBotRight} />
                    </div>
                </div>
            </div>
            <Modal
                title='Kết quả random'
                visible={modalVisible}
                onOk={handleModalOk}
                onCancel={handleModalOk}
            >
                <p>Kết quả random: {totalUsers === 16 || totalUsers === 8 ? 0 : totalUsers === 12 ? 1000000 : result.newRandomAmount}</p>
                <p>Tên người random: {name}</p>
            </Modal>
        </Fragment>
    );
};

export default Home;
