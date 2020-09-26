import React, { Component } from 'react';
import './style.css'

import { connect } from 'react-redux'
import { getCategories } from '../../actions/categoryActions'



import { Upload, message, Form, Input, Button, DatePicker, TimePicker, Select } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

import { createEvent } from '../../actions/eventActions'

  
function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
}

const { Option } = Select

class CreateShow extends Component{
    state = {
        loading: false,
        previewVisible: false,
        previewImage: "",
        fileList: []
    };
    
    handleCancel = () => this.setState({ previewVisible: false });

    handlePreview = file => {
        this.setState({
            previewImage: file.thumbUrl,
            previewVisible: true,
        });
        console.log('PREVIEW', file)
    };

    handleUpload = ({ fileList }) => {
        console.log('fileList', fileList)
        this.setState({ fileList })

    }

    componentDidMount() {
        this.props.getCategories();
    }

    render() {
        const { loading, previewImage, previewVisible, fileList} = this.state;

        const { categories } = this.props;

        const uploadButton = (
            <div>
                {loading ? <LoadingOutlined /> : <PlusOutlined />}
                <div style={{ marginTop: 8 }}>Upload</div>
            </div>
        );

        const config = {
            rules: [
              {
                type: 'object',
                required: true,
                message: 'Please select time!',
              },
            ],
        };

        const formItemLayout = {
            labelCol: {
                xs: {
                    span: 24,
                },
                sm: {
                    span: 8,
                },
            },
            wrapperCol: {
                xs: {
                    span: 24,
                },
                sm: {
                    span: 16,
                }
            }
        }

        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 24,
                    offset: 8,
                },
            },
        }

        const onFinish = fieldsValue => {
            // Should format date value before submit
            const values = {
              ...fieldsValue,
              'eventDate': fieldsValue['date-picker'].format('YYYY-MM-DD') + 'T' + fieldsValue['time-picker'].format('HH:mm:ss'),
            };

            let formData = new FormData();
            formData.append("event", this.state.fileList[0].originFileObj);
            formData.append("title", values.title);
            formData.append("description", values.description);
            formData.append("eventDate", values.eventDate);
            formData.append("price", values.price);
            formData.append("categoryId", values.categoryId)
            
            this.props.createEvent(formData);

        };
        
        return (
            <div className="createshow-form">
                <Form 
                    {...formItemLayout}
                    name="nest-messages" 
                    onFinish={onFinish}
                    fileList={fileList}
                >
                    
                    <Form.Item
                        name='event'
                        label="Upload"
                    >
                        <Upload   
                            listType="picture-card"
                            className="avatar-uploader"
                            onPreview={this.handlePreview}
                            customRequest={this.dummyRequest}
                            beforeUpload={beforeUpload}
                            onChange={this.handleUpload}
                            >
                            {previewVisible ? <img src={previewImage} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                        </Upload>
    
                    </Form.Item>
                    
                    
                    <Form.Item
                        name="title"
                        label="Name"
                        rules={[
                        {
                            required: true,
                        },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    
                    <Form.Item name="description" label="Description">
                        <Input.TextArea />
                    </Form.Item>

                    <Form.Item 
                        name="categoryId" 
                        label="Category"
                        rules={[
                            { 
                                required: true
                            }
                    ]}>
                        <Select
                            placeholder="Select type of your event"
                            allowClear
                        >
                            {categories && categories.map((item, index) => {
                                return <Option value={item._id}>{item.name}</Option>
                            })}
                        </Select>
                    </Form.Item>  

                    <Form.Item name="date-picker" label="DatePicker" {...config}>
                        <DatePicker />
                    </Form.Item>

                    <Form.Item name="time-picker" label="TimePicker" {...config}>
                        <TimePicker />
                    </Form.Item>  

                    <Form.Item name="price" label="Price (INR)">
                        <Input />
                    </Form.Item>  

                    <Form.Item
                    {...tailFormItemLayout}
                    >
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}

const mapStatetoProps = state => ({
    event: state.createEvent.event,
    categories: state.getCategories.categories, 
})

export default connect( mapStatetoProps, {
    createEvent,
    getCategories
})(CreateShow);