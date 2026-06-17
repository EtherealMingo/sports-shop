-- ============================================
-- 线材耗材管理系统 — 数据库建表脚本
-- 数据库: sports_db
-- 字符集: utf8mb4
-- ============================================

USE sports_db;

-- 1. 线材字典
CREATE TABLE IF NOT EXISTS tb_wire (
    id              BIGINT AUTO_INCREMENT PRIMARY KEY COMMENT '主键ID',
    brand           VARCHAR(50)  NOT NULL COMMENT '品牌（李宁/Yonex/王子…）',
    model           VARCHAR(50)  NOT NULL COMMENT '型号（N90/AB/66U…）',
    spec            VARCHAR(30)           COMMENT '规格粗细（如 0.65mm）',
    color           VARCHAR(30)           COMMENT '颜色',
    type            VARCHAR(20)  NOT NULL COMMENT '类型 tennis/badminton',
    min_stock       INT DEFAULT 0          COMMENT '最低库存预警线（条）',
    deleted         TINYINT DEFAULT 0      COMMENT '删除标记 0-正常 1-已删',
    create_time     DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    update_time     DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    INDEX idx_brand_model (brand, model),
    INDEX idx_type (type)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='线材字典';

-- 2. 供应商
CREATE TABLE IF NOT EXISTS tb_supplier (
    id              BIGINT AUTO_INCREMENT PRIMARY KEY COMMENT '主键ID',
    name            VARCHAR(100) NOT NULL COMMENT '供应商名称',
    contact         VARCHAR(50)           COMMENT '联络人',
    phone           VARCHAR(20)           COMMENT '电话',
    payment_method  VARCHAR(20)           COMMENT '支付方式 cash/transfer/monthly',
    remark          VARCHAR(500)          COMMENT '备注',
    deleted         TINYINT DEFAULT 0      COMMENT '删除标记 0-正常 1-已删',
    create_time     DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    update_time     DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    INDEX idx_name (name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='供应商表';

-- 3. 进货记录（批次计价）
CREATE TABLE IF NOT EXISTS tb_purchase (
    id              BIGINT AUTO_INCREMENT PRIMARY KEY COMMENT '主键ID',
    wire_id         BIGINT       NOT NULL COMMENT '线材ID',
    supplier_id     BIGINT       NOT NULL COMMENT '供应商ID',
    purchase_date   DATE         NOT NULL COMMENT '进货日期',
    quantity        INT          NOT NULL COMMENT '数量（条）',
    unit_price      DECIMAL(10,2) NOT NULL COMMENT '单价（元）',
    total_price     DECIMAL(12,2) NOT NULL COMMENT '总价（元）',
    payment_method  VARCHAR(20)           COMMENT '付款方式',
    batch_no        VARCHAR(30)  NOT NULL COMMENT '批次号（如 YNK-20260612-001）',
    remark          VARCHAR(500)          COMMENT '备注',
    deleted         TINYINT DEFAULT 0      COMMENT '删除标记 0-正常 1-已删',
    create_time     DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    update_time     DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    INDEX idx_wire_id (wire_id),
    INDEX idx_supplier_id (supplier_id),
    INDEX idx_purchase_date (purchase_date),
    INDEX idx_batch_no (batch_no)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='进货记录表';

-- 4. 正常消耗记录
CREATE TABLE IF NOT EXISTS tb_usage (
    id              BIGINT AUTO_INCREMENT PRIMARY KEY COMMENT '主键ID',
    wire_id         BIGINT       NOT NULL COMMENT '线材ID',
    usage_date      DATE         NOT NULL COMMENT '消耗日期',
    quantity        INT          NOT NULL COMMENT '消耗数量（条）',
    usage_type      VARCHAR(20)  NOT NULL DEFAULT 'service' COMMENT '用途类型 service-服务消耗',
    related_order   VARCHAR(64)           COMMENT '关联服务单号',
    operator        VARCHAR(50)           COMMENT '操作人',
    remark          VARCHAR(500)          COMMENT '备注',
    deleted         TINYINT DEFAULT 0      COMMENT '删除标记 0-正常 1-已删',
    create_time     DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    update_time     DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    INDEX idx_wire_id (wire_id),
    INDEX idx_usage_date (usage_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='消耗记录表';

-- 5. 报废消耗记录
CREATE TABLE IF NOT EXISTS tb_waste (
    id              BIGINT AUTO_INCREMENT PRIMARY KEY COMMENT '主键ID',
    wire_id         BIGINT       NOT NULL COMMENT '线材ID',
    waste_date      DATE         NOT NULL COMMENT '报废日期',
    quantity        INT          NOT NULL COMMENT '报废数量（条）',
    reason          VARCHAR(50)  NOT NULL COMMENT '原因 break-断裂 knot-打结 human-人为损坏 other-其他',
    operator        VARCHAR(50)           COMMENT '操作人',
    remark          VARCHAR(500)          COMMENT '备注',
    deleted         TINYINT DEFAULT 0      COMMENT '删除标记 0-正常 1-已删',
    create_time     DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    update_time     DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    INDEX idx_wire_id (wire_id),
    INDEX idx_waste_date (waste_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='报废记录表';

-- ============================================
-- 插入初始数据
-- ============================================

-- 线材
INSERT INTO tb_wire (brand, model, spec, color, type, min_stock) VALUES
('Yonex', 'BG-80', '0.68mm', '白色', 'badminton', 5),
('Yonex', 'BG-65', '0.70mm', '蓝色', 'badminton', 5),
('李宁', 'N90-III', '0.65mm', '黄色', 'badminton', 3),
('Wilson', 'Sensation', '1.25mm', '黑色', 'tennis', 3),
('Luxilon', 'ALU Power', '1.25mm', '银色', 'tennis', 3),
('尤尼克斯', 'AB', '0.61mm', '红色', 'badminton', 4),
('王子', 'Pro', '1.30mm', '绿色', 'tennis', 2),
('李宁', 'N55', '0.68mm', '白色', 'badminton', 5);

-- 供应商
INSERT INTO tb_supplier (name, contact, phone, payment_method, remark) VALUES
('上海羽毛球用品批发', '张经理', '138-0000-1111', 'transfer', 'Yonex 总代理'),
('北京体育器材中心', '李总', '139-0000-2222', 'monthly', '月结，量大优惠'),
('广州网球用品专卖', '王老板', '136-0000-3333', 'cash', '现场现货'),
('二手器材回收商', '赵师傅', '135-0000-4444', 'cash', '价格浮动较大');

-- 进货记录
INSERT INTO tb_purchase (wire_id, supplier_id, purchase_date, quantity, unit_price, total_price, payment_method, batch_no) VALUES
(1, 1, '2026-06-01', 20, 15.00, 300.00, 'transfer', 'YNX-20260601-001'),
(1, 1, '2026-06-10', 15, 16.00, 240.00, 'transfer', 'YNX-20260610-001'),
(2, 1, '2026-06-05', 10, 12.00, 120.00, 'transfer', 'YNX-20260605-001'),
(3, 2, '2026-06-08', 8, 18.00, 144.00, 'monthly', 'LN-20260608-001'),
(4, 3, '2026-06-03', 5, 22.00, 110.00, 'cash', 'WL-20260603-001'),
(5, 3, '2026-06-03', 3, 35.00, 105.00, 'cash', 'LX-20260603-001');

-- 消耗记录
INSERT INTO tb_usage (wire_id, usage_date, quantity, related_order, operator) VALUES
(1, '2026-06-10', 2, 'ORD-20260610-001', '张师傅'),
(1, '2026-06-11', 3, 'ORD-20260611-001', '王师傅'),
(2, '2026-06-11', 1, 'ORD-20260611-002', '张师傅'),
(3, '2026-06-12', 2, 'ORD-20260612-001', '王师傅'),
(4, '2026-06-12', 1, 'ORD-20260612-002', '李师傅');

-- 报废记录
INSERT INTO tb_waste (wire_id, waste_date, quantity, reason, operator) VALUES
(1, '2026-06-10', 1, 'knot', '张师傅'),
(1, '2026-06-11', 1, 'break', '王师傅'),
(3, '2026-06-12', 1, 'human', '王师傅');
