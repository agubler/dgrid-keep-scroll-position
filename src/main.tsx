import renderer, { tsx } from "@dojo/framework/core/vdom";
import WidgetBase from "@dojo/framework/core/WidgetBase";
import DgridWrapper, { SelectionType } from "@dojo/interop/dgrid/DgridWrapper";
import { uuid } from "@dojo/framework/core/util";

function generateData(count = 100) {
  const data = [];
  for (let i = 0; i < count; i++) {
    data.push({ id: uuid(), first: "Anthony", last: "Gubler" });
  }
  return data;
}

class App extends WidgetBase {
  private _data = generateData(100);
  private _columns = [
    { field: "id", label: "Id", renderExpando: true },
    { field: "first", label: "First" },
    { field: "last", label: "Last" }
  ];
  protected render() {
    return (
      <div>
        <div>
          Scroll using the grid and add data to the end, the current scroll
          position should be maintained
        </div>
        <DgridWrapper
          features={{
            selection: SelectionType.row
          }}
          data={this._data}
          columns={this._columns}
          keepScrollPosition={true}
        />
        <button
          onclick={() => {
            this._data = [...this._data, ...generateData(100)];
            this.invalidate();
          }}
        >
          Add Data
        </button>
      </div>
    );
  }
}

const r = renderer(() => <App />);
r.mount();
