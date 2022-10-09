const addToCart = async (id) => {
  const input = document.getElementById(`quantity${id}`)
  const quantity = input.value
  if (quantity <= 0){
    alert("quantity can't be less than 1")
  } else {
    const response = await fetch(`/cart/${id}`, {
      headers:{
          'Content-Type': 'application/json',
          "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluIiwibmFtZSI6ImFkbWluIiwic3VybmFtZSI6ImFkbWluIiwidGVsIjoxMjMsInBhc3N3b3JkIjoiJDJiJDEwJHdWOXJDNW9JUEpyR25YTzFZZGEuSS5RZk44T00zZ0NxTy9mNmM5MlhpRWR6a3MwZzF6c1FpIiwiYWRtaW4iOnRydWUsImlhdCI6MTY2NTI1NTQwOSwiZXhwIjoxNjY1MjU2MDA5fQ.9JpjsRFSCIyXfMvj0x2vbe1kXZVfj9_Y-253y8s7FhY"
      },
      method:"POST",
      body: JSON.stringify({
          quantity:quantity
      })
  })
  console.log(response);
  }

}