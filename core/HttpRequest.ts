class HttpRequest {
	static POST(url: string, data: any, callback: (data?: any) => void, error?: (code: number) => void) {
		$.ajax({
			url: url,
			type: "POST",
			data: data,
			success: (res: SimpleHttpResponse) => {
				if (res.Code == 0) {
					callback(res.Data);
				} else {
					if (error) {
						error(res.Code);
					}
					// 在这里处理返回的错误
				}
			},
			error: (res) => {

			}
		});
	}

	static GET(url: string, data: any, callback: (data?: any) => void) {
		$.ajax({
			url: url,
			type: "GET",
			data: data,
			success: (res: SimpleHttpResponse) => {
				if (res.Code == 0) {
					callback(res.Data);
				} else {
					// 在这里处理返回的错误
				}
			},
			error: (res) => {

			}
		});
	}

}