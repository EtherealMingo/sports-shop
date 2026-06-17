// @ai-generated - 全部由 AI 輔助生成
package com.sports.modules.exchange;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.sports.modules.exchange.ExchangeItem;
import com.sports.modules.exchange.ExchangeRecord;

/**
 * 兑换服务接口
 */
public interface ExchangeService {

    /**
     * 获取兑换商品列表
     */
    Page<ExchangeItem> getItemList(Page<ExchangeItem> page, String type);

    /**
     * 获取兑换商品详情
     */
    ExchangeItem getItemById(Long id);

    /**
     * 添加兑换商品
     */
    void createItem(ExchangeItem item);

    /**
     * 更新兑换商品
     */
    void updateItem(ExchangeItem item);

    /**
     * 删除兑换商品
     */
    void deleteItem(Long id);

    /**
     * 积分兑换
     */
    ExchangeRecord redeemItem(String memberId, Long itemId, Long operatorId, String operatorName);

    /**
     * 获取兑换记录列表
     */
    Page<ExchangeRecord> getRecordList(Page<ExchangeRecord> page, String status);

    /**
     * 核销兑换记录
     */
    void redeemRecord(Long recordId, Long operatorId, String operatorName);
}
