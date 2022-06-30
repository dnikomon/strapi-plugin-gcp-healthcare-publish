import React from 'react';
import { prefixPluginTranslations } from '@strapi/helper-plugin';
import pluginPkg from '../../package.json';
import pluginId from './pluginId';
import Initializer from './components/Initializer';
import PluginIcon from './components/PluginIcon';
import * as yup from "yup";
import Strapi from 'strapi-sdk-js';
import Publish from './components/Publisher'

const name = pluginPkg.strapi.name;

export default {
  register(app) {
    // app.addMenuLink({
    //   to: `/plugins/${pluginId}`,
    //   icon: PluginIcon,
    //   intlLabel: {
    //     id: `${pluginId}.plugin.name`,
    //     defaultMessage: name,
    //   },
    //   Component: async () => {
    //     const component = await import(/* webpackChunkName: "[request]" */ './pages/App');

    //     return component;
    //   },
    //   permissions: [
    //     // Uncomment to set the permissions of the plugin here
    //     // {
    //     //   action: '', // the action name should be plugin::plugin-name.actionType
    //     //   subject: null,
    //     // },
    //   ],
    // });
    const plugin = {
      id: pluginId,
      initializer: Initializer,
      isReady: false,
      name,
    };

    app.registerPlugin(plugin);
  },

  bootstrap(app) {
    app.injectContentManagerComponent("editView", "right-links", {
      name: "Comments",
      Component: Publish,
    });
    // Hook that adds a column into the CM's LV table
    // app.registerHook(
    //   "Admin/CM/pages/ListView/inject-column-in-table",
    //   addColumnToTableHook
    // );

    // const ctbPlugin = app.getPlugin("content-type-builder");

    // if (ctbPlugin) {
    //   const ctbFormsAPI = ctbPlugin.apis.forms;
    //   ctbFormsAPI.addContentTypeSchemaMutation(mutateCTBContentTypeSchema);
    //   ctbFormsAPI.components.add({
    //     id: "checkboxConfirmation",
    //     component: CheckboxConfirmation,
    //   });

    //   ctbFormsAPI.extendContentType({
    //     validator: () => ({
    //       versions: yup.object().shape({
    //         versioned: yup.bool(),
    //       }),
    //     }),
    //     form: {
    //       advanced() {
    //         return [
    //           {
    //             name: "pluginOptions.versions.versioned",
    //             description: {
    //               // id: getTrad(
    //               //   "plugin.schema.versions.versioned.description-content-type"
    //               // ),
    //               id: '1',
    //               defaultMessage: "subTitle",
    //             },
    //             type: "checkboxConfirmation",
    //             intlLabel: {
    //               // id: getTrad(
    //               //   "plugin.schema.versions.versioned.label-content-type"
    //               // ),
    //               id: '2',
    //               defaultMessage: "heading",
    //             },
    //           },
    //         ];
    //       },
    //     },
    //   });
    // }
  },
  async registerTrads(app) {
    const { locales } = app;

    const importedTrads = await Promise.all(
      locales.map(locale => {
        return import(`./translations/${locale}.json`)
          .then(({ default: data }) => {
            return {
              data: prefixPluginTranslations(data, pluginId),
              locale,
            };
          })
          .catch(() => {
            return {
              data: {},
              locale,
            };
          });
      })
    );

    return Promise.resolve(importedTrads);
  },
};
