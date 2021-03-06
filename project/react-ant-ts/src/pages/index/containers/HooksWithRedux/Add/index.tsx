import React, { useContext } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { DatePicker, Button, Form, Input } from 'antd'

import { BaseContext } from 'ROOT_SOURCE/utils/context'
import request from 'ROOT_SOURCE/utils/request'
import Rules from 'ROOT_SOURCE/utils/validateRules'



export default function (props: RouteComponentProps) {

    
    let { CONTAINER_ROUTE_PREFIX } = useContext(BaseContext);

    

    const onFinish = async (values: object) => {    
        //@ts-ignore
        values.contractDate = values.contractDate.format('YYYY-MM-DD');

        // action
        await request.post('/asset/addAsset', values)

        // 提交后返回list页
        props.history.push(`${CONTAINER_ROUTE_PREFIX}/list`)
    };



    return (
        <Form className="ui-background" onFinish={onFinish}>

            <Form.Item name='assetName' label='资产方名称' rules={[{ required: true }]}>
                <Input />
            </Form.Item>

            <Form.Item name='contract' label='签约主体' rules={[{ required: true }]}>
                <Input />
            </Form.Item>

            <Form.Item name='contractDate' label='签约时间' rules={[{ required: true }]}>
                <DatePicker showTime />
            </Form.Item>

            <Form.Item name='contacts' label='联系人'>
                <Input />
            </Form.Item>

            <Form.Item name='contactsPhone' label='联系电话' rules={[{ pattern: Rules.phone, message: '无效' }]}>
                <Input maxLength={11} />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit"> 提交 </Button>
            </Form.Item>

            <Form.Item>
                <Button type="primary" onClick={e => window.history.back()}> 取消/返回 </Button>
            </Form.Item>

        </Form>
    )
}
