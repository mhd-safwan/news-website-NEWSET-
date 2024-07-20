#!/usr/bin/env node

/**
 * This script resets the project to a blank state by:
 * - Moving the /app directory to /app-example
 * - Creating a new /app directory with index.tsx and _layout.tsx files.
 * You can remove the `reset-project` script from package.json and safely delete this file after running it.
 */

const fs = require('fs');
const path = require('path');

// Get the root directory of the project
const root = process.cwd();

// Paths for the old and new directories
const oldDirPath = path.join(root, 'app');
const newDirPath = path.join(root, 'app-example');
const newAppDirPath = path.join(root, 'app');

// Content for the new index.tsx file
const indexContent = `import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
    </View>
  );
}
`;

const layoutContent = `import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" />
    </Stack>
  );
}
`;

fs.rename(oldDirPath, newDirPath, (error) => {
  if (error) {
    console.error(`Error renaming directory: ${error}`);
    return;
  }
  console.log('/app moved to /app-example.');

  fs.mkdir(newAppDirPath, { recursive: true }, (error) => {
    if (error) {
      console.error(`Error creating new app directory: ${error}`);
      return;
    }
    console.log('New /app directory created.');

    const indexPath = path.join(newAppDirPath, 'index.tsx');
    fs.writeFile(indexPath, indexContent, (error) => {
      if (error) {
        console.error(`Error creating index.tsx: ${error}`);
        return;
      }
      console.log('app/index.tsx created.');

      const layoutPath = path.join(newAppDirPath, '_layout.tsx');
      fs.writeFile(layoutPath, layoutContent, (error) => {
        if (error) {
          console.error(`Error creating _layout.tsx: ${error}`);
          return;
        }
        console.log('app/_layout.tsx created.');
      });
    });
  });
});
