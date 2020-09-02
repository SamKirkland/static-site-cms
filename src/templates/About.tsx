import React from 'react';
import { Typography } from 'antd';
import { ITemplateProps } from '../CurrentPage';
import { useJsonForm } from '../UseJsonFileForm';
import ReactMarkdown from 'react-markdown';
import { InlineForm, InlineFormContext, InlineField } from 'react-tinacms-inline';
import { useLocalForm } from 'tinacms';

const customRenderers: ReactMarkdown.Renderers = {
    heading: (props: any) => <Typography.Title {...props} />
  };


export const About: React.FC<ITemplateProps> = (props) => {
    const [currentPageData] = useJsonForm(props.pageData, {
        id: "page",
        label: "About Page Settings"
    });

    //const { form, status, deactivate, activate } = useInlineForm();
    const [, form2] = useLocalForm({
        id: "form",
        label: "Test",
        fields: [
            {
                label: "Title",
                name: "title",
                component: "text",
                defaultValue: "abc 123"
            }
        ],
        onSubmit: () => alert("save")
    });

    return (
        <div>
            <InlineFormContext.Provider value={{
                form: form2,
                status: "active",
                activate: () => alert("edit"),
                deactivate: () => alert("dont edit")
            }}>
                <InlineForm form={form2}>
                    <h1>
                        asdads
                        
                        <InlineField name="title">
                            {({ input, status }) => {
                                console.log("!!!!!!!!!", status);
                                if (status === 'active') {
                                    return <input type="text" {...input} />
                                }

                                return <h1>{input.value}</h1>
                            }}
                        </InlineField>
                    </h1>
                </InlineForm>
            </InlineFormContext.Provider>
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