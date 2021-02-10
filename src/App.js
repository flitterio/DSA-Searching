import React, {Component} from 'react';

class App extends Component{
    state ={
        dataset : [89, 30, 25, 32, 72, 70, 51, 42, 25, 24, 53, 55, 78, 50, 13, 40, 48, 32, 26, 2, 14, 33, 45, 72, 56, 44, 21, 88, 27, 68, 15, 62, 93, 98, 73, 28, 16, 46, 87, 28, 65, 38, 67, 16, 85, 63, 23, 69, 64, 91, 9, 70, 81, 27, 97, 82, 6, 88, 3, 7, 46, 13, 11, 64, 76, 31, 26, 38, 28, 13, 17, 69, 90, 1, 6, 7, 64, 43, 9, 73, 80, 98, 46, 27, 22, 87, 49, 83, 6, 39, 42, 51, 54, 84, 34, 53, 78, 40, 14, 5],
        linearResult: '',
        binaryResult: '',
    }

     binarySearch = (array, value, start, end, tries = 0) => {
         console.log('binary search called')
         tries = tries + 1
        let sortedArr = array.sort();
        var start = start === undefined ? 0 : start;
        var end = end === undefined ? sortedArr.length : end;
    
        if (start > end) {
            return `Item not found, it took ${tries} tries using Binary`;
        }
    
        const index = Math.floor((start + end) / 2);
        const item = sortedArr[index];
        
        if (item == value) {
            return `Binary: Item is Found at index of ${index}. Using Binary Search, it took ${tries} tries`;
        }
        else if (item < value) {
            return this.binarySearch(array, value, index + 1, end, tries);
        }
        else if (item > value) {
            return this.binarySearch(array, value, start, index - 1, tries);
        }
    };

    indexOf = (array, value) => {
        let tries = 0;
        for (let i = 0; i < array.length; i++) {
            if (array[i] === parseInt(value)) {
                tries = i+1;
                return `Linear: Item is found at index of ${i}. Using Linear Search, it took ${tries} tries`;
            }
        }
        tries = array.length;
        return `Item not found, it took ${tries} tries using linear`;
    };

    handleSubmit = e => {
        e.preventDefault();
        let linearSearch = this.indexOf(this.state.dataset, e.target.value.value);

        let binarySearch = this.binarySearch(this.state.dataset, e.target.value.value);

        this.setState({
            linearResult: linearSearch,
            binaryResult: binarySearch
        })
    }

    render(){
        return(
            <div className='App'>
                <header className='App_header'>
                    <h1>Search Efficiency</h1>
                </header>

                <main className='App_main'>
                    <form className='testTree'
                        onSubmit={this.handleSubmit}>
                            <div>
                                <label htmlFor='value'>
                                Value Searching For:
                                {' '}
                                </label>
                                <input
                                type='text'
                                name='value'
                                id='value'
                                placeholder='ex'
                                required
                                />
                            </div>  

                            <button type='submit'>
                                Search
                            </button>
                        <div className='linearResult'>
                            {this.state.linearResult}
                            <br />
                            {this.state.binaryResult}
                        </div>
                    </form>
                </main>
            </div>
        );
    }
}

export default App;