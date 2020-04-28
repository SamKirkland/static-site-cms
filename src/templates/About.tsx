import React from 'react';
import { Typography } from 'antd';
import { ITemplateProps } from '../CurrentPage';
import { useJsonForm } from '../UseJsonFileForm';
import ReactMarkdown from 'react-markdown';

const customRenderers: ReactMarkdown.Renderers = {
    heading: (props: any) => <Typography.Title {...props} />,
  };


export const About: React.FC<ITemplateProps> = (props) => {
    const [currentPageData] = useJsonForm(props.pageData, {
        id: "page",
        label: "About Page Settings"
    });

    return (
        <div>
            <Typography.Title level={1}>{currentPageData.title}</Typography.Title>
            About us template...<br />
            About us...<br />
            Map etc
            <ReactMarkdown
                source={currentPageData.markdown}
                renderers={customRenderers as any}
            />
        </div>
    );
}