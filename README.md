# AINotator

Upload images and configure classes to annotate semantic segmentation data interactively using brush tools or polygon drawing to export the results in COCO format.

## Architecture

### Branching

    .
    ├── main/ # Finished until the deadline
    └── next/ # I wish I had more time

## Design System Composition Convention

    .
    └── ui/
        ├── Component/
        │   ├── index.tsx                   # Root component and sub components wrapped
        │   ├── SubComponent.tsx            # Any sub component to help composition
        .   ├── Component.stories.tsx|ts    # Storybook component story
        .   ├── Component.lib.ts            # Local component library with consts or helper functions
        .   └── Component.styles.ts         # Component styles using CVA

## How to use?

### Setup local development environment

1. Install pnpm

If you don’t already have pnpm installed, you can install it globally via npm:

```bash
npm install -g pnpm
```

Verify the installation:

```bash
pnpm --version
```

2. Clone the Repository

```bash
git clone git@github.com:soujvnunes/ainotator-web.git
cd ainotator-web
```

3. Install Dependencies

In the root of the repository, install the dependencies with pnpm:

```bash
pnpm install
```

4. Start the application

Check the scripts section in the repository’s `package.json` file:

```bash
pnpm dev # To run the front-end concurrently with the back-end server, necessary for the COCO format validation
```

### Using the web application

1. Adding an image

Click in the middle of the application web screen to display the operation system file picker.

2. Add a class name

Click in the `+` button located on the application web toolbar (left bottom of the screen) to display the annotation class dialog addition.

3. Annotation dialog

Fill all the necessary inputs for the class addition and click in the `add` button on the bottom of the modal.

> You'll be able to see the added class names below the main dialog. To close it, click on the `x` button at the right top of the main modal.

4. Toggle class names

The added class names will be placed at the application toolbar displaying the `type` (icon for the brush or polygon annotation) and the annotation name.

Click in one annotation and procced to brush or create a polygon form in the image.

> The resizer control on the middle of the application header will be enabled to adjust the brush size, and will be disabled when you toggle off the current annotation.

Click in the annotation again to left its current annotation type.

> The `export` button on the right side of the application header will be enabled to display the export details modal.

5. Export data set in COCO format

When you finish an annotation by toggling it off, click in `export` button to fill all the necessary inputs for the data set exportation in JSON format.

> For instance, if you fill a number field with string, the validation will fail and an error message will be displayed for it to be adjusted to procced.

When you finish to fill the export details click in the `validate` button on the bottom of the modal. If the validation is succesfull, the JSON file with the `images`, `annotations` and `categories` fields will be automatically downloaded. Otherwise, any errors will be shown in the modal content for you to fix it and try again.

6. Annotate another image

When you finish exporting annotations in JSON files, the canvas and the application state will be reseted so you can start annotating a new image.
