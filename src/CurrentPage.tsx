
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { ISiteConfig, IPage, allTemplate } from './types';
import { About } from "./templates/About";
import { Contact } from "./templates/Contact";

interface ICurrentPageProps {
    siteData: ISiteConfig;
}

export interface ITemplateProps {
    pageData: IPage;
}

interface IRenderTemplateProps {
    template: allTemplate;
    pageData: IPage;
}

class RenderTemplate extends React.Component<IRenderTemplateProps> {
    render() {
        const { template, ...rest } = this.props;

        switch (template) {
            case "about":
                return <About {...rest} />;
            
            case "contact":
                return <Contact {...rest} />;
            
            default:
                return <>That template type is not currently supported</>;
        }
    }
}

export class CurrentPage extends React.Component<ICurrentPageProps> {
    render() {
        const { siteData } = this.props;

        return (
            <Switch>
                <Route exact path="/">
                    Home Page
                </Route>
                {siteData.pages.map((page) =>
                    <Route exact path={page.url}>
                        <p>This page is rendered using the <strong>{page.template}</strong> template</p>
                        <RenderTemplate template={page.template} pageData={page} />
                    </Route>
                )}
                <Route>
                    <h1>404 page not found</h1>
                </Route>
            </Switch>
        );
    }
}