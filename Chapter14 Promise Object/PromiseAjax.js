const getJSON = function (url) {
    const promise = new Promise(function (resolve, reject) {
        const client = new XMLHttpRequest()
        client.open("GET", url)
        client.onreadystatechange = handler
        client.responseType = "json"
        client.setRequestHeader("Accept", "application/json")
        client.send()

        function handler() {
            if (this.readyState !== 4) {
                return
            }
            if (this.status === 200) {
                resolve(this.response)
            } else {
                reject(new Error(this.statusText))
            }
        }
    })
    return promise
}

//call

getJSON("/post.json").then(function (json) {
    console.log("Contents: " + json)
}, function (error) {
    console.error("Error! ", error)
})