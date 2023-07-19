import './App.css';
import {Counter} from './components/Counter/Counter';
import {useApp} from './hooks/useApp';



function App() {

    const {settingsChanged, setSettingsChanged ,error, getMaxValue, getMinValue, resetCount, addCount} = useApp()


    return (
        <div className="App">
            <Counter addCount={addCount} resetCount={resetCount}
                     settingsChanged={settingsChanged} error={error} getMinValue={getMinValue}
                     getMaxValue={getMaxValue} setSettingsChanged={setSettingsChanged}
            />

        </div>
    );
}

export default App;
