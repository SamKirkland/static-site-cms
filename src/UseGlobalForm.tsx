import { FormOptions, Form, useGlobalForm } from 'tinacms'
import { ISiteConfig, themes, templates } from './types';

export interface Options {
    id: string;
    label: string;
    actions?: FormOptions<any>['actions']
}

export function generateUniqueId() {
    return Math.floor(Math.random() * 100000000000) + 1;
}

export function useSiteSettingsForm(json: ISiteConfig, options: Options): [ISiteConfig, Form] {
    const actions = options.actions || [];
    
    const [values, form] = useGlobalForm<ISiteConfig>(
        {
            id: options.id,
            label: options.label,
            fields: [
                {
                  name: 'site.companyName',
                  label: 'Company Name',
                  component: 'text',
                },
                {
                  name: 'site.url',
                  label: 'Website URL',
                  component: 'text',
                },
                {
                  name: 'site.logo',
                  label: 'Company Logo',
                  component: 'text',
                },
                {
                  name: 'site.theme',
                  label: 'Site Theme',
                  component: 'select',
                  options: themes,
                } as any,
                {
                    label: 'Navigation',
                    name: 'pages',
                    component: 'group-list',
                    itemProps: (item: { title: string, uniqueId: number, url: string }) => ({
                        key: item.uniqueId,
                        label: item.title,
                    }),
                    defaultItem: () => ({
                        title: 'New Page',
                        url: '/new-page',
                        uniqueId: generateUniqueId()
                    }),
                    fields: [
                        {
                            label: 'Page Title',
                            name: 'title',
                            component: 'text',
                        },
                        {
                            label: 'Page URL',
                            name: 'url',
                            component: 'text',
                        },
                        {
                            label: 'Page Type',
                            name: 'template',
                            component: 'select',
                            options: templates
                        },
                    ],
                } as any
            ],
            actions,
            loadInitialValues: async function() {
                console.warn("ToDo: Implement data loading");
                const apiResponse = await fetch('/data/site.json');
                const apiData: ISiteConfig = await apiResponse.json();
                console.log("apiData", apiData);
                
                return apiData;
            },
            onSubmit() {
                console.warn("ToDo: Implement data save");
            },
            reset() {
                console.warn("ToDo: Implement data reset");
            },
        }
    )

    console.log("site settings", values, json, form);

    if (Object.keys(values).length !== 0) {
        return [values, form!];
    }

    return [json, form!];
}
