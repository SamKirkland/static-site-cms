
import React from 'react';
import { Menu } from 'antd';
import { NavLink } from 'react-router-dom';
import { ISiteConfig } from './types';

interface IMainNavProps {
    siteData: ISiteConfig;
}
interface IMainNavState {}

export class MainNav extends React.Component<IMainNavProps, IMainNavState> {
    render() {
        const { siteData } = this.props;

        return (
            <Menu theme="dark" mode="horizontal">
                {siteData.pages.map((page) =>
                    <Menu.Item key={page.uniqueId}>
                        <NavLink to={page.url} activeClassName="selected">
                            {page.title}
                        </NavLink>
                    </Menu.Item>
                )}
            </Menu>
        );
    }
}