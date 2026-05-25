async function test() {
    try {
        console.log('Fetching products from Render...');
        const res = await fetch('https://oil-business-backend.onrender.com/api/v1/products');
        console.log('Status:', res.status);
        const text = await res.text();
        console.log('Response body:', text.slice(0, 500));
    } catch (err) {
        console.error('Fetch error:', err.message);
    }
}
test();
