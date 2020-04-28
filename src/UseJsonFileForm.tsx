import { FormOptions, Field, Form, useLocalForm } from 'tinacms'
import { IPage } from './types';

function generateFields(json: IPage): Field[] {
    return json.content.map((x) => ({
        name: x.type,
        label: x.type,
        component: x.type
    }));
};

/**
 * A datastructure representing a JsonFile stored in Git
 */
export interface JsonFile<T = any> {
    fileRelativePath: string
    data: T
}

export interface Options {
    /** denotes under which object the data should be stored */
    id: string;
    label: string;
    actions?: FormOptions<any>['actions'];
}


/**
 * Creates a TinaCMS Form for editing a JsonFile
 */
export function useJsonForm<T = any>(json: IPage, options: Options): [T, Form] {
    const [values, form] = useLocalForm(
        {
            id: options.id,
            label: options.label,
            fields: generateFields(json),
            actions: options.actions || [],
            /*
            loadInitialValues: async function() {
                console.warn("ToDo: Implement data loading");
                const apiResponse = await fetch('/data/site.json');
                const apiData: ISiteConfig = await apiResponse.json();
                console.log("apiData", apiData);
                
                return apiData.pages[0].content;
            },
            */
            onSubmit(values, form, callback) {
                console.warn("ToDo: Implement data save");
            },
            reset() {
                console.warn("ToDo: Implement data reset");
            },
        }
    )

    /*
    const writeToDisk = useCallback(
        formState => {
            console.warn("ToDo: Implement file saving");
            console.info("path", json.site.url);
            console.info("content", JSON.stringify(formState.values, null, 2));
        },
        [json.site.url]
    )
    */

    //useWatchFormValues(form, writeToDisk);

    return [values || json, form!];
}