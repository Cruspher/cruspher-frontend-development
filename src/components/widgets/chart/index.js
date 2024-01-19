import React, {useEffect, useRef, memo} from "react";

const TradingViewWidgetChart = memo(() => {
	const container = useRef();

	useEffect(() => {
		const script = document.createElement("script");
		script.src =
			"https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
		script.type = "text/javascript";
		script.async = true;
		script.innerHTML = `
        {
          "autosize": true,
          "symbol": "BINANCE:BTCUSDT",
          "timezone": "Etc/UTC",
          "theme": "dark",
          "style": "1",
          "locale": "en",
          "enable_publishing": true,
          "withdateranges": true,
          "range": "YTD",
          "hide_side_toolbar": false,
          "allow_symbol_change": true,
          "details": true,
          "hotlist": true,
          "calendar": true,
          "support_host": "https://www.tradingview.com",
          "width": "50%",
          "height": "100%"
        }`;
		container.current.appendChild(script);
	}, []);

	return (
		<div
			className="tradingview-widget-container"
			style={{minHeight: "300px"}}
			ref={container}
		>
			<div
				className="tradingview-widget-container__widget"
				style={{height: "calc(100% - 32px)", width: "100%"}}
			></div>
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

export {TradingViewWidgetChart};
