/**
 Ce document est un document de l'État placé sous licence ouverte 1.0 ou ultérieure (https://www.etalab.gouv.fr/licence-ouverte-open-licence),
 comme tous les documents hébergés sur references.modernisation.gouv.fr. 
 Voir les conditions d'utilisation de la licence dans les mentions légales (http://references.modernisation.gouv.fr/mentions-legales).
**/

var Config = ( function(){

	'use strict';

	/**** SET ***/
	//lang
	var cfgLang = {
		testOn:{
			en: ' Display tests ',
			fr: ' Afficher les tests '
		},
		testOff:{
			en: ' Collapse tests',
			fr: ' Masquer les tests '
		},
		guideOn:{
			en: ' Display guide ',
			fr: ' Afficher le mode d\'emploi '
		},
		guideOff:{
			en: ' Collapse guide ',
			fr: ' Masquer le mode d\'emploi '
		},
		levelSelect:{
			en: ' Selected ',
			fr: ' Sélectionné '
		},
		summaryOn:{
			en: ' Display summary ',
			fr: ' Afficher le sommaire '
		},
		summaryOff:{
			en: ' Collapse summary ',
			fr: ' Masquer le sommaire '
		}	
	}
	// parameters
	var inputNiveau = document.getElementById( 'filtre-niveau' );
	var summaryCover = document.getElementById( 'titre-sommaire' );
	console.log( summaryCover )
	if( inputNiveau ){
	//togglelevel
	var bloc = document.getElementsByTagName( 'article' );
	var inputA = document.getElementById( 'filtre-A' );
	var inputAA = document.getElementById( 'filtre-AA' );
	var inputAAA = document.getElementById( 'filtre-AAA' );
	//toggletest
	var inputtests = document.getElementById( 'filtre-tests' ); 
	//setTitle
	var bloctitle = document.getElementsByClassName( 'critere' );
	var filtres = document.getElementById( 'filtres' );
	//toggleGuide
	var buttonGuide = document.getElementById( 'guide' );
	var displayGuide = document.getElementById( 'display-guide' );
	//Fixed filter
	var origOffsetY = filtres.offsetTop;
	//setFiltres
	var filtresbtn = document.getElementById( 'titre-filtres' ); 
	var thembtn = document.getElementById( 'titre-thematiques' );
	var footerAdapt = document.getElementById( 'footer' );
	//setLog
	var log = document.getElementById( 'log' );
	var logA = document.getElementById( 'log-a' );
	var logAA = document.getElementById( 'log-aa' );
	var logAAA = document.getElementById( 'log-aaa' );
	}
	else if( summaryCover ){
		var summaryContent = document.getElementById( 'list-sommaire' );
	}
	//setLang
	var lang = setdefaultLang();
	/*** DO ***/
	//init
	if( inputNiveau){
	inputA.checked = true;
	inputAA.checked = true;
	inputAAA.checked = true;
	setTitle();
	setFiltres();
	setGuide()
	//collapse
	togglelevel();
	toggletest();
	togglefiltres();
	togglethem();
	/*** Events ***/
	inputtests.addEventListener('click',toggletest, false );
	inputA.addEventListener( 'click' , togglelevel , false );
	inputAA.addEventListener( 'click' , togglelevel , false );
	inputAAA.addEventListener( 'click', togglelevel , false);
	document.addEventListener('scroll', onScroll);
	}
	else if( summaryCover ){
		 setCover();
	}
	/*** Functions ***/
	//togglelevel
	function togglelevel(){
		for( var i = 0, len = bloc.length; i < len; i++ ) {	
			switch ( bloc[i].dataset.level ){
				case 'A' :
				inputA.checked ? bloc[i].className = 'is-visible' : bloc[i].className = 'is-invisible';
				break;
				case 'AA':
				inputAA.checked ? bloc[i].className = 'is-visible' : bloc[i].className = 'is-invisible';
				break;
				case 'AAA':
				inputAAA.checked ? bloc[i].className = 'is-visible' : bloc[i].className = 'is-invisible';	
				break;
			}
		}
		setLog();
	}
	//setTitle
	function setTitle(){
		for( var j = 0, len = bloctitle.length; j < len; j++) {
			var elt = document.createElement( 'button' );
			elt.className = 'is-inactive';
			if( elt.className === 'is-inactive' ){
				var text = document.createTextNode( cfgLang.testOn[lang] );
			}
			else{
				var text = document.createTextNode( cfgLang.testOff[lang] );
			}
			elt.appendChild( text );
			bloctitle[j].appendChild( elt );
			
			elt.onclick = function(){
				this.parentNode.parentNode.getElementsByTagName( 'ul' )[0].classList.toggle( 'is-invisible' );
				this.parentNode.parentNode.getElementsByTagName( 'aside' )[0].classList.toggle( 'is-invisible' );
				this.classList.toggle( 'is-inactive' );
				if( this.className === 'is-inactive' ){
					this.textContent = cfgLang.testOn[lang];
				}
				else{
					this.textContent = cfgLang.testOff[lang];
				}
			}
		}
		
	}
	//toggleGuide
	function setGuide(){
			var elt = document.createElement( 'button' );
			if( elt.className === 'is-inactive' ){
				var text = document.createTextNode( cfgLang.guideOn[lang] );
			}
			else{
				var text = document.createTextNode( cfgLang.guideOff[lang] );
			}
			elt.appendChild( text );
			buttonGuide.appendChild( elt );
			
			elt.onclick = function(){
				displayGuide.classList.toggle( 'is-invisible' );
				this.classList.toggle( 'is-inactive' );
				if( this.className === 'is-inactive' ){
					this.textContent = cfgLang.guideOn[lang];
				}
				else{
					this.textContent = cfgLang.guideOff[lang];
				}
			}
	}
	//toggletest
	function toggletest(){
		for( var i = 0, len = bloc.length; i < len; i++) {
			if( ( bloc[i].dataset.level ) && ( inputtests.checked )){
				bloc[i].getElementsByTagName( 'ul' )[0].className = 'is-visible';
				bloc[i].getElementsByTagName( 'aside' )[0].className = 'is-visible';
				bloc[i].getElementsByTagName( 'button' )[0].textContent = cfgLang.testOff[lang];
				bloc[i].getElementsByTagName( 'button' )[0].removeAttribute('class');
			}
	 
			else if( ( bloc[i].dataset.level ) && ( !inputtests.checked ) ){
				bloc[i].getElementsByTagName( 'ul' )[0].className = 'is-invisible';
				bloc[i].getElementsByTagName( 'aside' )[0].className = 'is-invisible';
				bloc[i].getElementsByTagName( 'button' )[0].textContent = cfgLang.testOn[lang];
				bloc[i].getElementsByTagName( 'button' )[0].className = 'is-inactive';
			}
		}
	}
	//fixed filters
	function onScroll(e) {
	  window.scrollY >= origOffsetY ? filtres.classList.add( 'sticky' ) :
									  filtres.classList.remove( 'sticky' );
	}
	//setFiltres
	function setFiltres(){
	filtresbtn.setAttribute( 'aria-expanded' , 'true' );
	thembtn.setAttribute( 'aria-expanded' , 'true' );
	filtresbtn.setAttribute( 'aria-owns' , 'elt-filtres' );
	thembtn.setAttribute( 'aria-owns' , 'nav-thematiques' );
	}
	function togglefiltres(){
		filtresbtn.onclick = function(){
			this.nextElementSibling.classList.toggle( 'is-invisible' );
			this.classList.toggle( 'is-inactive' );
			if( this.className === 'is-inactive' ){
				this.setAttribute( 'aria-expanded' , 'false' );
				document.getElementById( 'log-node' ).style.display = 'inline-block';
			}
			else{
				this.setAttribute( 'aria-expanded' , 'true' );
				document.getElementById( 'log-node' ).style.display = 'none';
			}
		};
	};
	function togglethem(){
		thembtn.onclick = function(){
			this.nextElementSibling.classList.toggle( 'is-invisible' );
			this.classList.toggle( 'is-inactive' );
			if( this.className === 'is-inactive' ){
				this.setAttribute( 'aria-expanded' , 'false' );
				footerAdapt.classList.toggle( 'adapted');
			}
			else{
				this.setAttribute( 'aria-expanded' , 'true' );
				footerAdapt.classList.toggle( 'adapted');
			}
		};
	};
	//setLog
	function setLog(){
		//reset
		var target = filtresbtn.childNodes[1];
		if( target ) {
			filtresbtn.removeChild( target );
		}
		var log = document.createElement( 'span' );
		log.setAttribute( 'id', 'log-node' );
		//A ?
		if( inputA.checked ){
			setLevel( log, 'A ' );
		}
		else{
			var nolevel = span();
			nolevel.appendChild( setText( '\u00a0\u00a0\u00a0' ) );
			log.appendChild( nolevel );
		}
		//AA ?
		if( inputAA.checked ){
			setLevel( log, 'AA ' );

		}
		else{
			var nolevel = span();
			nolevel.appendChild( setText( '\u00a0\u00a0\u00a0\u00a0\u00a0' ) );			
			log.appendChild( nolevel );				
		}
		//AAA ?
		if( inputAAA.checked ){
			setLevel( log, 'AAA ' );
		}
		else{
			var nolevel = span();
			nolevel.appendChild( setText( '\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0' ) );			
			log.appendChild( nolevel );			
		}	
		//depedencie
		function setLevel( log, levelRef ){
		var spanNode = span()
		spanNode.appendChild( setText( cfgLang.levelSelect[lang] ) );
		spanNode.classList.add( 'sr' );
		log.appendChild( spanNode );
		var level = span();
		level.appendChild( setText ( levelRef) );
		log.appendChild( level );
		}
		//append
		filtresbtn.appendChild( log );
		//Set display
		( filtresbtn.getAttribute( 'aria-expanded' ) === 'true' ) ?
			document.getElementById( 'log-node' ).style.display = 'none'
			:
			document.getElementById( 'log-node' ).style.display = 'inline-block';			
	}
	//setCover
	function setCover(){
			var elt = document.createElement( 'button' );
			if( elt.className === 'is-inactive' ){
				var text = document.createTextNode( cfgLang.summaryOn[lang] );
			}
			else{
				var text = document.createTextNode( cfgLang.summaryOff[lang] );
			}
			elt.appendChild( text );
			summaryCover.appendChild( elt );		
			elt.onclick = function(){
				summaryContent.classList.toggle( 'is-invisible' );
				this.classList.toggle( 'is-inactive' );
				if( this.className === 'is-inactive' ){
					this.textContent = cfgLang.summaryOn[lang];
				}
				else{
					this.textContent = cfgLang.summaryOff[lang];
				}
			}
	}
	//helpers
	function span(){
		var span = document.createElement('span');
		return span;
	}
	function setText( content ){
		var node = document.createTextNode(content); 
		return node;
	}
	// get default language (based on lang attribute)
	function setdefaultLang(){
		var lang = document.querySelector( 'html' ).getAttribute( 'lang' );
		if( lang ){
			var ndx;
			( lang.indexOf( '-' ) > 0 ) ? ndx = lang.indexOf( '-' ) : ndx = 3;
			return lang.substring( 0, ndx );
		}
		else {
		 return 'en';
		}
	}
})();

