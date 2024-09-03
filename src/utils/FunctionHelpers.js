
export const splitArtistName = (s) => {
    if (s) {
        let temp = s.split(",");
        return temp.filter(t => t != "");
    }
    return [];
}
export const convertToEnglishString = (str) => {
    // Chuyển đổi các ký tự dấu tiếng Việt thành không dấu
    const vietnameseMap = {
        'à': 'a', 'á': 'a', 'ả': 'a', 'ã': 'a', 'ạ': 'a',
        'â': 'a', 'ầ': 'a', 'ấ': 'a', 'ẩ': 'a', 'ẫ': 'a', 'ậ': 'a',
        'à': 'a', 'á': 'a', 'ả': 'a', 'ã': 'a', 'ạ': 'a',
        'è': 'e', 'é': 'e', 'ẻ': 'e', 'ẽ': 'e', 'ẹ': 'e',
        'ê': 'e', 'ề': 'e', 'ế': 'e', 'ể': 'e', 'ễ': 'e', 'ệ': 'e',
        'ì': 'i', 'í': 'i', 'ỉ': 'i', 'ĩ': 'i', 'ị': 'i',
        'ò': 'o', 'ó': 'o', 'ỏ': 'o', 'õ': 'o', 'ọ': 'o',
        'ô': 'o', 'ồ': 'o', 'ố': 'o', 'ổ': 'o', 'ỗ': 'o', 'ộ': 'o',
        'ơ': 'o', 'ờ': 'o', 'ớ': 'o', 'ở': 'o', 'ỡ': 'o', 'ợ': 'o',
        'ù': 'u', 'ú': 'u', 'ủ': 'u', 'ũ': 'u', 'ụ': 'u',
        'ư': 'u', 'ừ': 'u', 'ứ': 'u', 'ử': 'u', 'ữ': 'u', 'ự': 'u',
        'ỳ': 'y', 'ý': 'y', 'ỷ': 'y', 'ỹ': 'y', 'ỵ': 'y',
        'đ': 'd',
        '': ''
    };

    // Tạo một biểu thức chính quy để tìm các ký tự tiếng Việt có dấu
    const vietnameseRegex = new RegExp(Object.keys(vietnameseMap).join('|'), 'g');

    // Thay thế ký tự có dấu bằng ký tự không dấu và thay thế khoảng trắng bằng dấu gạch ngang
    return str.toLowerCase()
        .replace(vietnameseRegex, match => vietnameseMap[match])  // Thay thế ký tự có dấu bằng không dấu
        .replace(/^\s+|\s+$/g, '')  // Xóa khoảng trắng đầu và cuối
        .replace(/\s+/g, '-')  // Thay thế khoảng trắng ở giữa bằng dấu gạch ngang
        .concat(str.match(/^\s+/) ? ' '.repeat(str.match(/^\s+/)[0].length) : '')  // Thêm khoảng trắng đầu nếu có
        .concat(str.match(/\s+$/) ? ' '.repeat(str.match(/\s+$/)[0].length) : '');  // Thêm khoảng trắng cuối nếu có
}