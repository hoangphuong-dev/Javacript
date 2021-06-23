getCovidWorld();
getCovidCountry();
getSelectCountry();
const btnSelect = document.getElementById("select_word")
btnSelect.addEventListener("click", getCountryById)

function getCountryById(e) {
	fetch('https://coronavirus-tracker-api.herokuapp.com/v2/locations/'+e.target.value)
	.then(res => res.json())
	.then(data => {
		let id = data.location.id;
		let code = data.location.country_code;
		let ten_quoc_gia = data.location.country;
		let tinh = data.location.province;
		let dan_so = data.location.country_population;
		let bi_nhiem = data.location.latest.confirmed;
		let tu_vong = data.location.latest.deaths;
		let cap_nhat = data.location.last_updated;
		let hoi_phuc = data.location.latest.recovered;
		if(data.location.province == "") {
			document.getElementById("quocgia").innerHTML = ten_quoc_gia.toLocaleString("en")
			document.getElementById("title").innerText = ten_quoc_gia.toLocaleString("en")
		} else {
			document.getElementById("quocgia").innerHTML = ten_quoc_gia.toLocaleString("en")+ '-' +tinh.toLocaleString("en")
			document.getElementById("title").innerText = ten_quoc_gia.toLocaleString("en")+ '-' +tinh.toLocaleString("en")
		}

		document.getElementById("id").innerHTML = id.toLocaleString("en")
		document.getElementById("ma_quoc_gia").innerHTML = code.toLocaleString("en")
		document.getElementById("dan_so").innerHTML = dan_so.toLocaleString("en")
		document.getElementById("bi_nhiem").innerHTML = bi_nhiem.toLocaleString("en")
		document.getElementById("tu_vong").innerHTML = tu_vong.toLocaleString("en")
		document.getElementById("hoi_phuc").innerHTML = hoi_phuc.toLocaleString("en")
		document.getElementById("cap_nhat").innerHTML = cap_nhat.substring(0,10)
		document.getElementById("phan_tram").innerHTML = (Number(tu_vong)/Number(bi_nhiem)*100).toLocaleString("en", {minimunFractionDigits: 2, maximunFractionDigits: 2}) + "%"
	}).catch(error => console.log('Error'));
}


function getCovidCountry() {
	fetch('https://coronavirus-tracker-api.herokuapp.com/v2/locations/270')
	.then(res => res.json())
	.then(data => {
		let id = data.location.id;
		let code = data.location.country_code;
		let ten_quoc_gia = data.location.country;
		let dan_so = data.location.country_population;
		let tinh = data.location.province;
		let bi_nhiem = data.location.latest.confirmed;
		let tu_vong = data.location.latest.deaths;
		let cap_nhat = data.location.last_updated;
		let hoi_phuc = data.location.latest.recovered;
		if(data.location.province == "") {
			document.getElementById("quocgia").innerHTML = ten_quoc_gia.toLocaleString("en")
			document.getElementById("title").innerText = ten_quoc_gia.toLocaleString("en")
		} else {
			document.getElementById("quocgia").innerHTML = ten_quoc_gia.toLocaleString("en")+ '-' +tinh.toLocaleString("en")
			document.getElementById("title").innerText = ten_quoc_gia.toLocaleString("en")+ '-' +tinh.toLocaleString("en")
		}

		document.getElementById("id").innerHTML = id.toLocaleString("en")
		document.getElementById("ma_quoc_gia").innerHTML = code.toLocaleString("en")
		document.getElementById("dan_so").innerHTML = dan_so.toLocaleString("en")
		document.getElementById("bi_nhiem").innerHTML = bi_nhiem.toLocaleString("en")
		document.getElementById("tu_vong").innerHTML = tu_vong.toLocaleString("en")
		document.getElementById("hoi_phuc").innerHTML = hoi_phuc.toLocaleString("en")
		document.getElementById("cap_nhat").innerHTML = cap_nhat.substring(0,10)
		document.getElementById("phan_tram").innerHTML = (Number(tu_vong)/Number(bi_nhiem)*100).toLocaleString("en", {minimunFractionDigits: 2, maximunFractionDigits: 2}) + "%"
	}).catch(error => console.log('Error'));
}
function getCovidWorld() {
	fetch('https://coronavirus-tracker-api.herokuapp.com/v2/locations')
	.then(res => res.json())
	.then(data => {
		let nguoi_nhiem = data.latest.confirmed;
		let chet = data.latest.deaths;
		let phuc_hoi = data.latest.recovered;
		document.getElementById("tong-ca_nhiem").innerHTML = nguoi_nhiem.toLocaleString("en")
		document.getElementById("tong-tu_vong").innerHTML = chet.toLocaleString("en")
		document.getElementById("tong-phuc_hoi").innerHTML = phuc_hoi.toLocaleString("en")
		const html = data.locations.map(covid => {
			const id = covid.id;
			const code = covid.country_code;
			const ten_quoc_gia = covid.country;
			const tinh = covid.province;
			const dan_so = covid.country_population;
			const bi_nhiem = covid.latest.confirmed;
			const tu_vong = covid.latest.deaths;
			const cap_nhat = covid.last_updated;
			const hoi_phuc = covid.latest.recovered;

			return `
			<ul class="list-world">
			<li>
			<p>id: ${id}</p>
			<p style ='color:red'>Quốc gia: ${ten_quoc_gia.toLocaleString("en")}</p>
			<p style ='color:blue'>${tinh.toLocaleString("en")}</p>
			<p>Mã quốc gia: ${code.toLocaleString("en")}</p>
			<p>Dân số: ${new Intl.NumberFormat().format(dan_so)}</p>
			<p>Cập nhật: ${cap_nhat.substring(0,10)}</p>
			<p>Ca nhiễm: ${bi_nhiem.toLocaleString("en")}</p>
			<p>Tử vong: ${tu_vong.toLocaleString("en")}</p>
			<p>Phần trăm: ${(Number(tu_vong)/Number(bi_nhiem)*100).toLocaleString("en", {minimunFractionDigits: 2, maximunFractionDigits: 2}) + "%"}</p>
			</li>
			</ul>
			`
		}).join("")
		document.getElementById("list").insertAdjacentHTML("afterbegin", html)
	}).catch(error => console.log('Error'));
}
function getSelectCountry() {
	fetch('https://coronavirus-tracker-api.herokuapp.com/v2/locations')
	.then(res => res.json())
	.then(data => {
		const html = data.locations.map(list => {
			const id = list.id;
			const quocgia = list.country;

			var option = document.createElement('option')
			option.value = id;
			if(list.province == "") {
				option.innerHTML = quocgia;
			} else {
				option.innerHTML = quocgia + '- ' +list.province
			}
			document.getElementById("select_word").appendChild(option)
		})
	}).catch(error => console.log('Error'));
}