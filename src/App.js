import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import Form from 'react-bootstrap/Form';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Dropdown from 'react-bootstrap/Dropdown';
import Tooltip from 'react-bootstrap/Tooltip';
import DropdownButton from 'react-bootstrap/DropdownButton';
import DropdownItem from './DropdownItem.js';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      array: [],
      finshed: false,
      sorting: false,
      right: false,
      left: true,
      color: '#343a40',
      iterator: null,
      count: 50,
      success: '#00ff44',
      delay: 0
    }    
    this.resetArray = this.resetArray.bind(this)
    this.randomIntFromInterval = this.randomIntFromInterval.bind(this)
    this.insertionSort = this.insertionSort.bind(this)
    this.bubbleSort = this.bubbleSort.bind(this)
    this.shellSort = this.shellSort.bind(this)
    this.selectionSort = this.selectionSort.bind(this)
    this.cocktailSort = this.cocktailSort.bind(this)
    this.mergeSort = this.mergeSort.bind(this)
    this.success = this.success.bind(this)
    this.handleCountChange = this.handleCountChange.bind(this)
    this.handleSpeedChange = this.handleSpeedChange.bind(this)
  }

  resetArray() {
    let array = []
    for(let i = 0; i < this.state.count; i++) {
      array.push(this.randomIntFromInterval(10, 490))
    }
    this.setState({ array, finished: false })
  }

  componentDidMount() {
    this.resetArray()
  }

  randomIntFromInterval(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min)
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async success(color) {
    let el = document.querySelectorAll('.number')
    let array = this.state.array
    for(let i = 0; i < array.length; i++) {
      await this.sleep(0)
      el[i].style.backgroundColor = color
      setTimeout(() => {
        el[i].style.backgroundColor = this.state.color
      }, 50)
    }
  }

  async insertionSort() {
    this.setState({sorting: true})
    let array = this.state.array
    let n = array.length;
    for (let i = 1; i < n; i++) {
      let current = array[i];
      let j = i - 1; 
      while ((j > -1) && (current < array[j])) {
          this.setState({iterator: j})
          await this.sleep(this.state.delay)
          this.setState({array})
          array[j + 1] = array[j];
          j--;
      }
      array[j+1] = current;
    }
    this.success(this.state.success)
    return this.setState({ array,finished: true, sorting: false })
  }

  async bubbleSort() {
    this.setState({sorting: true})
    let array = this.state.array
    let swapp;
    let n = array.length-1;
    let x = array;
    do {
      swapp = false;
      for (var i=0; i < n; i++) {
        this.setState({iterator: i})
        if (x[i] > x[i+1]) {
          let temp = x[i];
          x[i] = x[i + 1];
          x[i + 1] = temp;
          swapp = true;
          await this.sleep(this.state.delay)
          this.setState({array})
        }
      }
      n--;
  } while(swapp);
  this.success(this.state.success)
  return this.setState({ array, finished: true, sorting: false})
}

  async shellSort() {
    this.setState({sorting: true})
    let array = this.state.array
    let increment = array.length / 2;
    while (increment > 0) {
      for (let i = increment; i < array.length; i++) {
          let j = i;
          let temp = array[i];
          await this.sleep(this.state.delay)
          this.setState({array})
          this.setState({iterator: i})
          while (j >= increment && array[j - increment] > temp) {
            this.setState({iterator: j})
            array[j] = array[j-increment];
            j = j - increment;
          }
        array[j] = temp;
        await this.sleep(this.state.delay)
        this.setState({array})
        this.setState({iterator: j})
      }
      if (increment === 2) {
          increment = 1;

      } else {
          increment = parseInt(increment * 5 / 11);
      }
    }
    this.success(this.state.success)
    return this.setState({ array, finished: true, sorting: false })
  }

  async selectionSort(){
    this.setState({sorting: true})
    let array = this.state.array
    for(var i = 0; i < array.length; i++){
      //set min to the current iteration of i
      var min = i;
      for(var j = i+1; j < array.length; j++){
        if(array[j] < array[min]){
         min = j;
         await this.sleep(this.state.delay)
         this.setState({array})
         this.setState({iterator: j})
        }
      }
      var temp = array[i];
      array[i] = array[min];
      array[min] = temp;
    }
    this.success(this.state.success)
    return this.setState({ array, finished: true, sorting: false })
  };

  async cocktailSort() {
    this.setState({sorting: true})
    let array = this.state.array
    let swapped;
    do {
      for(let i = 0; i < array.length - 2; i++) {
        if(array[i] > array[i + 1]) {
          let temp = array[i];
          array[i] = array[i + 1];
          array[i + 1] = temp;
          swapped = true;
          this.setState({iterator: i + 1})
          await this.sleep(this.state.delay)
          this.setState({array})
        }
      }	
      if(!swapped) {
        break;
      }
      swapped = false;
      for(let i = array.length - 2; i > 0; i--) {
        if(array[i] > array[i+1]) {
          let temp1 = array[i];
          array[i] = array[i+1];
          array[i+1] = temp1;
          swapped = true;
          this.setState({iterator: i})
          await this.sleep(this.state.delay)
          this.setState({array})
        }
      }
    } while(swapped);
    this.success(this.state.success)
    return this.setState({array, finished: true, sorting: false});
  }

  async mergeSort() {
    this.setState({sorting: true})
    let array = this.state.array
    var sorted = array.slice(),
        n = sorted.length,
        buffer = array;
    for (var size = 1; size < n; size *= 2) {
      await this.sleep(this.state.delay)
      this.setState({array: buffer})
      for (var leftStart = 0; leftStart < n; leftStart += 2*size) {
        this.setState({iterator: leftStart})
        await this.sleep(this.state.delay)
        this.setState({array: buffer})
        var left = leftStart,
            right = Math.min(left + size, n),
            leftLimit = right,
            rightLimit = Math.min(right + size, n),
            i = left;
        while (left < leftLimit && right < rightLimit) {
          this.setState({iterator: i})
          await this.sleep(this.state.delay)
          this.setState({array: buffer})
          if (sorted[left] <= sorted[right]) {
            buffer[i++] = sorted[left++];
          } else {
            buffer[i++] = sorted[right++];
          }
        }
        while (left < leftLimit) {
          await this.sleep(this.state.delay)
          this.setState({array: buffer})
          buffer[i++] = sorted[left++];
        }
        while (right < rightLimit) {
          this.setState({iterator: i})
          await this.sleep(this.state.delay)
          this.setState({array: buffer})
          buffer[i++] = sorted[right++];
        }
      }
      var temp = sorted,
          sorted = buffer,
          buffer = temp;
    }
    this.success(this.state.success)
    return this.setState({array: sorted, finished: true, sorting: false});
  }


  colorSelect(color) {
    this.setState({ color })
  }

  handleCountChange(event) {
    this.setState({count: event.target.value});
    this.resetArray()
  }

  handleSpeedChange(event) {
    this.setState({delay: event.target.value});
  }

  render() {
    return (
      <>
      <Navbar className="nav" collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand>Sorting Algorithm Visualizer</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto"></Nav>
            <div className="buttons">
              <Button variant="primary" bg="dark" disabled={this.state.sorting} onClick={this.resetArray}><i className="fa fa-sync-alt"></i></Button>
              <Dropdown drop="down">
                <DropdownButton variant="dark" drop="down" className="colorBox" disabled={this.state.sorting || this.state.finished} id="dropdown-basic-button" title="Algorithms">
                  <Dropdown.Item variant="light" disabled={this.state.sorting || this.state.finished} onClick={this.insertionSort}>Insertion Sort</Dropdown.Item>
                  <Dropdown.Item variant="light" disabled={this.state.sorting || this.state.finished} onClick={this.bubbleSort}>Bubble Sort</Dropdown.Item>
                  <Dropdown.Item variant="light" disabled={this.state.sorting || this.state.finished} onClick={this.shellSort}>Shell Sort</Dropdown.Item>
                  <Dropdown.Item variant="light" disabled={this.state.sorting || this.state.finished} onClick={this.selectionSort}>Selection Sort</Dropdown.Item>
                  <Dropdown.Item variant="light" disabled={this.state.sorting || this.state.finished} onClick={this.cocktailSort}>Cocktail Sort</Dropdown.Item>
                  <Dropdown.Item variant="light" disabled={this.state.sorting || this.state.finished} onClick={this.mergeSort}>Merge Sort</Dropdown.Item>
                </DropdownButton>
              </Dropdown>
              <DropdownButton variant="dark" drop="down" className="colorBox" disabled={this.state.sorting || this.state.finished} id="dropdown-basic-button" title={<i class="fas fa-paint-brush"></i>}>
                <DropdownItem onClick={this.colorSelect.bind(this)} label="Grey" color="#343a40"></DropdownItem>
                <DropdownItem onClick={this.colorSelect.bind(this)} label="Blue" color="#007BFF"></DropdownItem>
                <DropdownItem onClick={this.colorSelect.bind(this)} label="Green" color="#1ed485"></DropdownItem>
                <DropdownItem onClick={this.colorSelect.bind(this)} label="Pink" color="#ff3d94"></DropdownItem>
                <DropdownItem onClick={this.colorSelect.bind(this)} label="Purple" color="#dd00ff"></DropdownItem>
                <DropdownItem onClick={this.colorSelect.bind(this)} label="Yellow" color="#fcba03"></DropdownItem>
                <DropdownItem onClick={this.colorSelect.bind(this)} label="Black" color="#000000"></DropdownItem>
              </DropdownButton>
              <Form className="slider">
                <Form.Group className="slider" controlId="formBasicRange">
                  <Form.Label className="countLabel">Array Size</Form.Label>
                  <Form.Control
                  type="range" 
                  min="20" max="100" 
                  step="1"
                  value={this.state.count} 
                  onChange={this.handleCountChange}
                  disabled={this.state.sorting || this.state.finished} />
                </Form.Group>
              </Form>
              <div className="badge"><Badge variant="light">{this.state.count}</Badge></div>
              <Form className="slider">
                <Form.Group className="slider" controlId="formBasicRange">
                  <Form.Label className="countLabel">Delay</Form.Label>
                  <Form.Control
                  type="range" 
                  min="0" max="100" 
                  step="1"
                  value={this.state.delay} 
                  onChange={this.handleSpeedChange} />
                </Form.Group>
              </Form>
              <div className="badge"><Badge variant="light">{this.state.delay}ms</Badge></div>
            </div>
        </Navbar.Collapse>
      </Navbar>
        <div className="App">
          <div className="numbers" style={{transform: this.state.left ? 'rotateX(180deg)' : 'rotateY(180deg) rotateX(180deg)'}}>
            {this.state.array.map((number, index) => {
              return(
                <>
                  <OverlayTrigger 
                  placement="top" 
                  overlay={
                    <Tooltip>
                      Value: <strong>{number}</strong>
                    </Tooltip>}>
                  <div className="number" key={index} style={{width: '15px', height: number,  
                   backgroundColor: this.state.iterator === index && this.state.sorting ? 'red' : this.state.color &&
                   this.state.success === index ? '#00ff44' : this.state.color}}></div>
                  </OverlayTrigger>
                </>
              )
              
            })}
          </div>
          <Navbar fixed="bottom" className="footer" bg="dark" variant="dark">
            <p>Ryan Jacobson © 2020 </p>
            <i style={{cursor: 'pointer'}} href="https://github.com/jacobsonryan/sorting-visualizer" className="fab fa-github"></i>
          </Navbar>
        </div>
      </>
    );
  }
}

export default App;
