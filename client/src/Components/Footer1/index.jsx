import React from "react";
import { Footer } from 'flowbite-react';


function Footer1() {
	return (
	  <Footer container>
		<Footer.Copyright href="#" by="TripTeller™" year={2024} />
		<Footer.LinkGroup>
		  <Footer.Link href="#">About</Footer.Link>
		  <Footer.Link href="#">Privacy Policy</Footer.Link>
		  <Footer.Link href="#">Licensing</Footer.Link>
		  <Footer.Link href="#">Contact</Footer.Link>
		</Footer.LinkGroup>
	  </Footer>
	);
  }
export default Footer1;
