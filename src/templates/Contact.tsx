
import React from 'react';
import { Typography } from 'antd';
import { ITemplateProps } from '../CurrentPage';


interface IContactState {}

export class Contact extends React.Component<ITemplateProps, IContactState> {
    render() {
        const { pageData } = this.props;

        return (
            <div>
                <Typography.Title level={1}>{pageData.title}</Typography.Title>
                Contact us template...<br />
                Contact us...<br />
                Map etc
            </div>
        );
    }
}