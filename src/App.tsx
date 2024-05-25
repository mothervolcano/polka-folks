import { SyntheticEvent, useContext, useEffect, useState } from "react";

import {
  Container,
  Flex,
  Stack,
  Title,
  Text,
  DEFAULT_THEME,
  Space,
  ColorPicker,
  Button,
  Divider,
  NativeSelect,
} from "@mantine/core";

import { useMediaQuery } from "@mantine/hooks";

// .......................................................

import { Archetype, ParamSet, Param } from "./types";
import ShapeContext from "./ShapeContext";

import Stage from "./Stage";
import Gallery from "./components/Gallery";

import {
  punkArchetype,
  nerdArchetype,
  baroqueArchetype
} from "./models/archetypes";

// --------------------------------------------------------------
// ARCHETYPES LIST OPTIONS

const archetypes = [
  punkArchetype,
  nerdArchetype,
  baroqueArchetype
];

// --------------------------------------------------------------
// LAYOUT COMPONENTS

const Layout = ({ orientation, children }: any) => {
  if (orientation === "LANDSCAPE") {
    return (
      <Flex direction="row">
        <div
          style={{
            position: "relative",
            minWidth: "300px",
            maxWidth: "25%",
            overflowY: "auto",
          }}
        >
          {children[0]}
        </div>
        <div style={{ position: "relative", minWidth: "250px", flexGrow: "1" }}>
          {children[1]}
        </div>
      </Flex>
    );
  } else if (orientation === "PORTRAIT") {
    return (
      <Stack justify="flex-start" align="stretch">
        <div style={{ position: "relative" }}>{children[1]}</div>
        <div style={{ position: "relative", overflowY: "auto" }}>
          {children[0]}
        </div>
      </Stack>
    );
  } else {
    return null;
  }
};

function App() {
  const [initialized, setInitialized] = useState<boolean>(false);
  const [currentArchetype, setCurrentArchetype] = useState<any>(archetypes[0]);
  // const [currentScene, setCurrentScene] = useState<any>("");

  const [stage, setStage] = useState<any>(null);
  const [consoleParams, setConsoleParams] = useState<ParamSet>(
    currentArchetype.params,
  );
  const [baseParams, setBaseParams] = useState<ParamSet>(currentArchetype.baseParams);

  const { shapeCollection, setShapeCollection } = useContext(ShapeContext);

  // -------------------------------------------------------------------------------------------------------
  // MEDIA QUERIES

  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const isLandscape = useMediaQuery("(orientation: landscape)");
  const isPortrait = useMediaQuery("(orientation: portrait)");

  // -------------------------------------------------------------------------------------------------------
  // HANDLERS

  /**
   * Handler for the scene selections
   * */

  const handleArchetypeSelectionInput = (event: HTMLSelectElement) => {
    const selectedScene = archetypes.find((archetype) => archetype.option === event.value);
    if (selectedScene) {
      const prevParams: Param[] = consoleParams;
      const currBaseWidthParam = prevParams.find(
        (p) => p.id === "baseWidthCtrl",
      );
      const currBaseDepthParam = prevParams.find(
        (p) => p.id === "baseDepthCtrl",
      );
      const currBaseHeightParam = prevParams.find(
        (p) => p.id === "baseHeightCtrl",
      );
      const newParams = selectedScene.params.map((p) => {
        if (
          currBaseWidthParam &&
          p.id === currBaseWidthParam.id &&
          initialized
        ) {
          p.value = currBaseWidthParam.value;
        }
        if (
          currBaseDepthParam &&
          p.id === currBaseDepthParam.id &&
          initialized
        ) {
          p.value = currBaseDepthParam.value;
        }
        if (
          currBaseHeightParam &&
          p.id === currBaseHeightParam.id &&
          initialized
        ) {
          p.value = currBaseHeightParam.value;
        }
        return p;
      });

      setCurrentArchetype(selectedScene);

      if (newParams) {
        setConsoleParams(newParams);
      }
    }
  };

  /**
   * Handler for the console
   * */
  const handleParamCtrlInputForModel = (updatedParams: any) => {
    setInitialized(true);
    setConsoleParams(updatedParams);
  };

  const downloadArtwork = (event: SyntheticEvent) => {
    event.preventDefault();

    if (stage) {
      const url =
        "data:image/svg+xml;utf8," + encodeURIComponent(stage.exportSVG());
      const a = document.createElement("a");
      document.body.appendChild(a);
      a.style.display = "none";
      a.href = url;
      a.download = "test.svg";
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    }
  };

  const copyArtworkToClipboard = async (event: SyntheticEvent) => {
  event.preventDefault();

  if (stage) {
    const svgData = stage.exportSVG();
    try {
      await navigator.clipboard.writeText(svgData);
      console.log('SVG data copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy SVG data: ', err);
    }
  }
};

  /**
   * Handler for the gallery save function
   * */
  const saveShape = (event: SyntheticEvent) => {
    // ...
    // event.preventDefault();
    // const currentShapePath = extractPath();
    // const currentShapeSvgData = convertPathToSVG(currentShapePath, 1);
    // const shapeToSave = {
    //   timestamp: null,
    //   svg: currentShapeSvgData,
    //   color: artColor,
    //   width: currentShapePath.bounds.width,
    //   height: currentShapePath.bounds.height,
    // };
    // currentShapePath.remove();
    // const collection = shapeCollection.slice();
    // const nextSlot = collection.findIndex((item) => item.svg === null);
    // collection[nextSlot] = shapeToSave;
    // setShapeCollection(collection);
  };

  // -------------------------------------------------------------------------------------------------------
  // STYLES

  const frameMargin = 6;
  const dark = DEFAULT_THEME.colors.dark[5];
  const softDark = DEFAULT_THEME.colors.dark[0];
  const light = DEFAULT_THEME.colors.gray[0];
  const softLight = DEFAULT_THEME.colors.gray[2];

  const containerStyle = {
    // position: "relative",
    width: "100%",
    height: "100vh",
    padding: isDesktop ? `${frameMargin}vh` : "0",
  };

  const frameStyle = {
    border: isDesktop ? `1px solid ${dark}` : "none",
    borderRadius: isDesktop ? `10px` : "none",
  };

  const sidebarStyle = {
    borderRadius: isDesktop ? "8px 0 0 0" : "none",
  };

  const stageStyle = {
    height: isLandscape ? `${100 - frameMargin * 2}vh` : `45vh`,
    borderLeft: isLandscape ? `1px solid ${dark}` : "none",
    borderBottom: isLandscape ? "none" : `1px solid ${dark}`,
    backgroundColor: "#000028",
  };

  const titleStyle = {
    position: "absolute",
    top: "15px",
    left: "15px",
  };

  const consoleLayoutType = isPortrait ? "ROW" : "COL";
  const consoleLayoutMode = isPortrait ? "COMPACT" : "NORMAL";

  // -------------------------------------------------------------------------------------------------------
  // BLOCKS

  const consoleSwitch = (model: Archetype, layout: string, mode: string) => {
    const Console = model.console;
    return (
      <Console
        params={consoleParams}
        inputHandler={handleParamCtrlInputForModel}
        layout={layout}
        mode={mode}
      />
    );
  };

  const title = () => {
    return (
      <div
        style={{
          position: "absolute",
          top: "0.50rem",
          left: "1rem",
        }}
      >
        <Title c={dark}>Isotopo</Title>
      </div>
    );
  };

  const saveButton = () => {
    return (
      <div
        style={{
          position: "absolute",
          bottom: "0px",
          left: "0px",
          width: "100%",
        }}
      >
        <>
          <Flex justify="flex-end">
            <Button
              style={{}}
              bg={dark}
              m="1rem"
              variant="filled"
              onClick={copyArtworkToClipboard}
            >
              Download
            </Button>
          </Flex>
          <Gallery />
        </>
      </div>
    );
  };

  const header = () => {
    return (
      <Container
        fluid
        w="100%"
        bg={dark}
        pt="sm"
        pb="md"
        mb="md"
        style={sidebarStyle}
      >
        <Title c={light}>Isotopo</Title>
        <Space h="md" />
        <Text size="sm" c={softLight}>
          Isometric object generator.
        </Text>
      </Container>
    );
  };

  const panel = () => {
    return (
      <div style={{ width: "100%" }}>
        {isLandscape && header()}
        <Stack w={"100%"} pt="0.5rem" pl="1rem" pr="1rem" gap={15}>
          <div>
            <Text
              size={isPortrait ? "0.80rem" : "sm"}
              fw={isPortrait ? "400" : "500"}
              c={
                isPortrait
                  ? "var(--mantine-color-dark-2)"
                  : "var(--mantine-color-dark-3)"
              }
            >
              Select Scene:
            </Text>
            <NativeSelect
              value={currentArchetype.option}
              onChange={(event) =>
                handleArchetypeSelectionInput(event.currentTarget)
              }
              data={archetypes.map((archetype) => {
                return { label: archetype.label, value: archetype.option };
              })}
            />
          </div>
          {consoleSwitch(currentArchetype, consoleLayoutType, consoleLayoutMode)}
        </Stack>
      </div>
    );
  };

  return (
    <div>
      <header>
        <div style={containerStyle}>
          <div style={frameStyle}>
            <Layout orientation={isLandscape ? "LANDSCAPE" : "PORTRAIT"}>
              {panel()}
              <Stage
                style={stageStyle}
                model={currentArchetype}
                baseParams={baseParams}
                params={consoleParams}
                setStageManager={setStage}
              >
                {!isLandscape && title()}
                {isLandscape && saveButton()}
              </Stage>
            </Layout>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
