export default function (plop) {
  // Configuración del generador de módulos básico
  plop.setGenerator('module', {
    description: 'Create a new module with clean architecture structure',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Module name (in kebab-case):',
        validate: (value) => {
          if (/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value)) {
            return true;
          }
          return 'Please enter a valid kebab-case name (e.g., "my-module")';
        }
      },
      {
        type: 'input',
        name: 'description',
        message: 'Module description:'
      },
      {
        type: 'input',
        name: 'icon',
        message: 'Icon name from @heroicons/react/24/outline (e.g. HomeIcon, UserIcon):',
        default: 'HomeIcon'
      },
      {
        type: 'confirm',
        name: 'hasSubmenus',
        message: 'Will this module have submenus?',
        default: false
      },
      {
        type: 'input',
        name: 'submenus',
        message: 'Submenu names (comma-separated, in kebab-case):',
        when: (answers) => answers.hasSubmenus,
        filter: (input) => input.split(',').map(p => p.trim()).filter(Boolean)
      }
    ],
    actions: function(data) {
      const actions = [];
      
      console.log('\nCreando módulo:', data.name);
      
      // 1. Crear estructura básica del módulo
      actions.push({
        type: 'addMany',
        destination: 'src/modules/{{dashCase name}}',
        templateFiles: 'plop-templates/module/**/*',
        base: 'plop-templates/module',
        data: data,
        force: false
      });

      actions.push({
        type: 'add',
        path: 'src/modules/{{dashCase name}}/presentation/pages/{{pascalCase name}}Page.tsx',
        templateFile: 'plop-templates/module/presentation/pages/page.tsx.hbs'
      });
      
      // 2. Si tiene submódulos, crear un archivo para cada uno
      if (data.hasSubmenus && data.submenus && data.submenus.length > 0) {
        data.submenus.forEach(submenu => {
          actions.push({
            type: 'add',
            path: `src/modules/{{dashCase name}}/presentation/pages/${plop.getHelper('pascalCase')(submenu)}.tsx`,
            template: `import React from 'react';\n
              export const ${plop.getHelper('pascalCase')(submenu)} = () => {\n
                return (\n
                  <div className="p-6">\n
                    <h1 className="text-2xl font-bold mb-4">${plop.getHelper('pascalCase')(submenu)}</h1>\n
                    <p>Este es el submódulo ${plop.getHelper('pascalCase')(submenu)} del módulo ${plop.getHelper('pascalCase')(data.name)}.</p>\n
                  </div>\n
                );\n
              };\n`
          });
        });
      }

      actions.push({
        type: 'modify',
        path: 'src/core/router/index.tsx',
        pattern: /(\/\/ Aquí agregar nuevas rutas)/,
        template: `{
        path: '{{dashCase name}}',
        element: (
          <ProtectedRoute
            element={<{{pascalCase name}}Page />}
            flag={FeatureFlags.{{constantCase name}}}
          />
        ),
      },
      $1`
      });

      actions.push({
        type: 'modify',
        path: 'src/core/router/index.tsx',
        pattern: /(\/\/ Aquí importar nuevos componentes)/,
        template: `import { {{pascalCase name}}Page } from '@/modules/{{dashCase name}}/presentation/pages/{{pascalCase name}}Page';
      // $1`
      });

      actions.push({
        type: 'modify',
        path: 'src/core/config/menuConfig.tsx',
        pattern: /(\/\/ Aquí agregar nuevos items al menú)/,
        template: `{
        label: '{{pascalCase name}}',
        path: '/{{dashCase name}}',
        icon: <HomeIcon />, // Cambia el ícono si quieres
        featureFlag: FeatureFlags.{{constantCase name}}
      },
      $1`
      });
      
      
      console.log('\n✅ Se creó la estructura básica del módulo.');
      console.log('🔍 Recuerda que debes configurar manualmente:');
      console.log('  - Feature flags en src/core/config/featureFlags.ts');
      console.log('  - Menú en src/core/config/menuConfig.tsx');
      console.log('  - Rutas en src/core/router/routes.tsx');
      
      return actions;
    }
  });
  
  // Instrucciones generales
  console.log('\n💡 Generador básico de módulos');
  console.log('\nEste generador crea la estructura básica de carpetas para un nuevo módulo.');
  console.log('Deberás configurar manualmente los feature flags, menús y rutas.');
  console.log('\nPara usar, ejecuta: npm run generate module');
  console.log('Sigue el asistente interactivo para configurar tu módulo');
}; 