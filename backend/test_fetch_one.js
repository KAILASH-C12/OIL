async function test() {
    try {
        const res = await fetch('https://oil-business-backend.onrender.com/api/v1/products');
        const data = await res.json();
        console.log(JSON.stringify(data.data[0], null, 2));
    } catch (err) {
        console.error(err);
    }
}
test();
