import React, { Component } from 'react'
import {
    Descriptions, Button, Form,
    Input,
    Tooltip,
    Icon,
    Cascader,
    Select,
    Row,
    Col,
    Checkbox,
    AutoComplete,
} from 'antd';

export default class Dashboard extends Component {
    state = {
        edit: false
    }

    render() {
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        };

        let editdiv =
            <div>

            </div>

        let noneditdiv =
            <div>
                <div className="row">
                    <div className="col-7">
                        <div>

                            <div title="Hospital Profile">
                                <div className='label'>Name</div>
                                <div className="description">Zhou Maomao</div>
                                <div className='label'>Phones</div>
                                <div className="description">1810000000</div>
                                <div className='label'>Address</div>
                                <div className="description">Hangzhou, Zhejiang</div>
                                <div className='label'>Speciality</div>
                                <div className="description">empty</div>
                                <div className='label'>Emails</div>
                                <div className="description">Lorem ipsum dolor sit amet.</div>
                                <div className='label'>Description</div>
                                <div className='description'>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Est dolor fuga quia quos iste? Ipsum magni nobis debitis perspiciatis. Minima, ex ullam. Ipsum maiores, tempora voluptatem distinctio blanditiis illo veniam?
                            </div>
                            </div>
                        </div>
                        <div className="text-center mt-5">
                            <Button type='primary'>Edit</Button>
                        </div>
                    </div>
                    <div className="col-5">
                        <img className='w-100' src={require('../assets/placeholder.png')} />
                        <div className="text-center mt-5">
                            <Button type='primary'>new img</Button>
                        </div>
                    </div>
                </div>

            </div>


        return (
            this.state.edit ? editdiv : noneditdiv
        )
    }
}
