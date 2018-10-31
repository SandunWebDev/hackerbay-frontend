
/* These settings only affect the editor integration. (Ex: VSCode with ESLint & Prettier plugins). They won’t affect the terminal and in-browser lint output. 
 * This is because Create React App intentionally provides a minimal set of rules that find common mistakes. 
 * 
 * To manually lint run "npm run lint".
 * Later gonna consider using husky + git hooks to automatic code format when commits.
*/

module.exports = {
  "extends": ["react-app", "plugin:prettier/recommended"]
}