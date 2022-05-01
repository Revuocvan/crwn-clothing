import { useState, useEffect } from 'react';

import './App.css';
import CardList from './components/card-list/card-list.component';
import SearchBox from './components/search-box/search-box.component';

//functional component
const emptyVariable = null;
console.log(emptyVariable);
const App = () => {
  console.log("render");
  const [searchField, setSearchField] = useState(''); // [value, setValue]
  const [monsters, setMonsters] = useState([]);
  const [filteredMonsters, setFilteredMonsters] = useState(monsters);

  useEffect(() => {
    console.log('fetching');
    fetch('https://jsonplaceholder.typicode.com/users')
    .then((response) => response.json())
    .then((users) => setMonsters(users)); 
  }, []);

  useEffect(() => {
    const newFilteredMonsters = monsters.filter(monster => {
      return monster.name.toLowerCase().includes(searchField);
    });

    setFilteredMonsters(newFilteredMonsters);
  }, [monsters, searchField]);

  const onSearchChange = (event) => {
    const searchFieldString = event.target.value.toLowerCase();
    setSearchField(searchFieldString);
  }



  return (
    <div className="App">
      <h1 className='app-title'>Monster Rolodex</h1>
      <SearchBox onChangeHandler={onSearchChange} placeholder='monsters' className='monsters-search-box'/>
      <CardList monsters={filteredMonsters}/>
    </div>
  );
}

/*
class App extends Component{
  constructor() {
    super();

    this.state = {
      monsters:  [],
      searchField: ""
    };
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
    .then((response) => response.json())
    .then((users) => this.setState(
      () => {
      return {monsters: users}
    }, () => {
    })); 
  } 

  onSearchChange = (event) => {
    const searchField = event.target.value.toLowerCase();
    this.setState(() => {
      return {searchField };
    });
  }

  render() {
    const {monsters, searchField} = this.state;
    const {onSearchChange} = this;

    return (
      <div className="App">
        <h1 className='app-title'>Monster Rolodex</h1>
        <SearchBox onChangeHandler={onSearchChange} placeholder='monsters' className='monsters-search-box'/>
        <CardList monsters={filteredMonsters}/>
      </div>
    );
  }
}
*/
export default App;
