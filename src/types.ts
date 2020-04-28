interface IContent {
    type: "text" | "textarea" | "markdown" | "html" | "number" | "date" | "image" | "color" | "toggle" | "select" | "group" | "group-list" | "blocks";
    value: string;
}

export interface IPage {
    title: string;

    /** @example "/home" */
    url: string;

    /** Must be unique, should use generateUniqueId */
    uniqueId: number;

    template: allTemplate;
    content: IContent[];
}

export interface ISiteConfig {
    site: {
        companyName: string;
        url: string;
        theme: allThemes;
        logo: string;
    },
    pages: IPage[];
};

export const templates: string[] = ["showcase", "about", "contact", "rating"];
export type allTemplate = "showcase" | "about" | "contact" | "rating";

export const themes: string[] = ["forest", "somethingElse", "desert"];
export type allThemes = "forest" | "somethingElse" | "desert";