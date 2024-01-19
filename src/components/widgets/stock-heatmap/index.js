import React, {useEffect, useRef, memo} from "react";

const TradingViewWidgetStockHeatmap = memo(() => {
	const container = useRef();

	useEffect(() => {
		const script = document.createElement("script");
		script.src =
			"https://s3.tradingview.com/external-embedding/embed-widget-stock-heatmap.js";
		script.type = "text/javascript";
		script.async = true;
		script.innerHTML = `
        {
          "exchanges": [],
          "dataSource": "SPX500",
          "grouping": "sector",
          "blockSize": "Value.Traded",
          "blockColor": "change",
          "locale": "en",
          "symbolUrl": "",
          "colorTheme": "dark",
          "hasTopBar": true,
          "isDataSetEnabled": true,
          "isZoomEnabled": true,
          "hasSymbolTooltip": true,
          "width": "calc(50% - 30px)",
          "height": "100%"
        }`;
		container.current.appendChild(script);
	}, []);

	return (
		<div
			className="tradingview-widget-container"
			ref={container}
		>
			<div className="tradingview-widget-container__widget"></div>
			<div className="tradingview-widget-copyright">
				<a
					href="https://www.tradingview.com/"
					rel="noopener nofollow"
					target="_blank"
				>
					<span className="blue-text">Track all markets on TradingView</span>
				</a>
			</div>
		</div>
	);
});

export {TradingViewWidgetStockHeatmap};
