import {useEffect, useState} from "react";
import {Input, Box, Button, Checkbox, Text} from "@chakra-ui/react";


const Home= () => {
    const [tasks, setTaskes] = useState([])
    const [input, setInput] = useState("")
    const [isChecked, setIsChecked] = useState([]);

    useEffect(() => {
        async function getData() {
            await fetch("http://localhost:3000/api/todo")
                .then((response) => response.json())
                .then((data) => setTaskes(data.data));
        }
        getData()
    }, [])
    useEffect(() => {
        setIsChecked(new Array(tasks.length).fill(false))
    }, [tasks])

    async function addData() {
        if(input===""){
            alert('Empty Input')
            return;
        }
        const response = await fetch("http://localhost:3000/api/todo", {
                method: 'POST',
                body: JSON.stringify({"name": input}),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            }
        )
        if (response.ok) {
            response.json().then(() => {
                alert('Todo Added!')
                window.location.reload()
            })
        }
    }

    async function deleteData(taskName) {
        const response = await fetch("http://localhost:3000/api/todo", {
                method: 'Delete',
                body: JSON.stringify({"name": taskName}),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            }
        )
        if (response.ok) {
            response.json().then(() => {
                alert('Todo Deleted!')
                window.location.reload()
            })
        }
    }


    const toggleCheckboxValue = (index) => {
        setIsChecked(isChecked.map((v, i) => (i === index ? !v : v)));
    }
    return(
        <>
            <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                textAlign="center"
                alignItems="center"
                height="100vh"
            >
                <Text fontSize='3xl'>Todo App</Text>
                <Box width="25vw" p="4" display="flex">
                    <Input onChange={(e) => setInput(e.target.value)} placeholder='Add Todo ...'/>
                    <Button ml={5} onClick={addData}>Submit</Button>
                </Box>
                <ul>
                    {tasks.map((task, index) => {
                        return (
                            <Box display="flex"  mt="5" width="23vw">
                                <Checkbox width="20vw" value={task.name} isChecked={isChecked[index]}
                                          onChange={() => toggleCheckboxValue(index)}>
                                    {
                                        (isChecked[index] === true) ?
                                            <del>
                                                <h1>{task.name}</h1>
                                            </del>
                                            :
                                            <h1>{task.name}</h1>
                                    }
                                </Checkbox>
                                <Button ml="5" colorScheme='red' size="sm"
                                        onClick={() => deleteData(task.name)}>Delete</Button>
                            </Box>
                        );
                    })}
                </ul>
            </Box>
        </>
    );
};

export default Home;
