import Container from "./components/Container";
import FieldsetFrame from "./components/FieldsetFrame";
import Converter from "./components/Converter";

function App() {
  return (
    <Container>
      <FieldsetFrame title="Currency Converter">
        <Converter />
      </FieldsetFrame>
    </Container>
  );
}

export default App;
